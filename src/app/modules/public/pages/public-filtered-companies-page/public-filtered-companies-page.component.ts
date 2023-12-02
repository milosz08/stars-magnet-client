/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { PageableCompaniesService } from '~/app-public/services/pageable-companies/pageable-companies.service';
import { SearchCompanyBoxService } from '~/app-public/services/search-company-box/search-company-box.service';
import { SearchCompanyService } from '~/app-public/services/search-company/search-company.service';

@Component({
  selector: 'app-public-filtered-companies-page',
  templateUrl: './public-filtered-companies-page.component.html',
  providers: [PageableCompaniesService, SearchCompanyService],
})
export class PublicFilteredCompaniesPageComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  searchContent$: Observable<string> =
    this._searchCompanyBoxService.searchContent$;

  constructor(
    private readonly _searchCompanyService: SearchCompanyService,
    private readonly _searchCompanyBoxService: SearchCompanyBoxService
  ) {
    super();
  }

  ngOnInit(): void {
    this.refreshCompanies(false);
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onChangePage(page: number): void {
    this._searchCompanyService
      .moveToPage$(page)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }

  refreshCompanies(isRefresh = true): void {
    this._searchCompanyService
      .loadPageable$(isRefresh)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
    this._searchCompanyService
      .loadFilteredCompanies$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }
}
