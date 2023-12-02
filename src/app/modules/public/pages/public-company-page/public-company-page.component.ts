/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { RouterHelperService } from '~/app-commons/services/router-helper/router-helper.service';
import { TemplatePageTitleStrategy } from '~/app-commons/strategies/template-page-title.strategy';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';

@Component({
  selector: 'app-public-company-page',
  templateUrl: './public-company-page.component.html',
  providers: [SingleCompanyService, CompanyOpinionService, RouterHelperService],
})
export class PublicCompanyPageComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  isLoaded = false;
  companyId!: number;
  companyName = '';

  constructor(
    private readonly _routerHelperService: RouterHelperService,
    private readonly _singleCompanyService: SingleCompanyService,
    private readonly _companyOpinionsService: CompanyOpinionService,
    private readonly _templatePageTitleStrategy: TemplatePageTitleStrategy
  ) {
    super();
  }

  ngOnInit(): void {
    this._routerHelperService.checkAndExtractParamId(
      'companyId',
      '/companies',
      companyId => this.loadContent(Number(companyId))
    );
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  private loadContent(companyId: number): void {
    this.companyId = companyId;
    this._singleCompanyService
      .loadCompanyDetails$(companyId)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(d => {
        this._companyOpinionsService
          .loadPageable$(companyId)
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
        this._companyOpinionsService
          .loadOpinions$()
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
        this.companyName = d.name;
        this._templatePageTitleStrategy.createCustomTitle(d.name);
        this.isLoaded = true;
      });
  }
}
