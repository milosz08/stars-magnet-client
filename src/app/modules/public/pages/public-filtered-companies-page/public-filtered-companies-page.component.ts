/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: public-filtered-companies-page.component.ts
 *   Created at: 2023-06-06, 15:54:56
 *   Last updated at: 2023-08-30, 22:20:10
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
