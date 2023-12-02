/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { CompanyResDtoModel } from '~/app-public/models/company.model';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';

@Component({
  selector: 'app-company-details-left-card',
  templateUrl: './company-details-left-card.component.html',
  styleUrls: ['./company-details-left-card.component.scss'],
})
export class CompanyDetailsLeftCardComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  companyDetails?: CompanyResDtoModel;
  starsStructure$: Observable<string[]> =
    this._singleCompanyService.starsStructure$;
  lazyLoader$: Observable<boolean> = this._singleCompanyService.lazyLoader$;

  constructor(private readonly _singleCompanyService: SingleCompanyService) {
    super();
  }

  ngOnInit(): void {
    this._singleCompanyService.companyDetails$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(d => (this.companyDetails = d!));
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }
}
