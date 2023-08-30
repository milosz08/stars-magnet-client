/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: companies-search-bar.component.ts
 *   Created at: 2023-06-04, 11:43:22
 *   Last updated at: 2023-08-30, 22:24:56
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
import { SearchCompanyBoxService } from '~/app-public/services/search-company-box/search-company-box.service';
import { SearchCompanyService } from '~/app-public/services/search-company/search-company.service';

@Component({
  selector: 'app-companies-search-bar',
  templateUrl: './companies-search-bar.component.html',
})
export class CompaniesSearchBarComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  searchContent = '';
  isInitialLoad = true;
  searchContent$: Observable<string> =
    this._searchCompanyBoxService.searchContent$;

  constructor(
    private readonly _searchCompanyService: SearchCompanyService,
    private readonly _searchCompanyBoxService: SearchCompanyBoxService
  ) {
    super();
  }

  ngOnInit(): void {
    this._searchCompanyBoxService
      .getDebouncedSearchResult$(this._unsubscribe)
      .subscribe(phrase => {
        this.searchContent = phrase;
        if (this.isInitialLoad) return;
        this._searchCompanyService
          .loadPageable$()
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
        this._searchCompanyService
          .loadFilteredCompanies$()
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
      });
  }

  ngOnDestroy(): void {
    this.isInitialLoad = true;
    this.subjectCleanup();
  }

  onSetNewParaphrase(phrase: string): void {
    this.isInitialLoad = false;
    this._searchCompanyService.pushNewParaphrase(phrase);
  }
}
