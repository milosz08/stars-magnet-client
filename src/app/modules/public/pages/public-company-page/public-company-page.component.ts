/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: public-company-page.component.ts
 *   Created at: 2023-06-05, 05:25:01
 *   Last updated at: 2023-08-30, 22:19:27
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
