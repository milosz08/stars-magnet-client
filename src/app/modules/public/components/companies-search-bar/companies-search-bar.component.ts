/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
