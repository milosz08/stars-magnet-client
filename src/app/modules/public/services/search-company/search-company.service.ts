/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, takeUntil, tap, throwError } from 'rxjs';
import { CompanyHttpService } from '~/app-commons/http-services/company-http/company-http.service';
import {
  CompanyFilterModel,
  DEF_FILTER,
} from '~/app-commons/models/company-filter.model';
import {
  PageableLimitsUnion,
  PrePageableData,
  pageableLimits,
} from '~/app-commons/models/pagination.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { PageableLimitService } from '~/app-commons/services/pageable-limit/pageable-limit.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyResDtoModel } from '~/app-public/models/company.model';
import { CompanyFilterService } from '../company-filter/company-filter.service';
import { PageableCompaniesService } from '../pageable-companies/pageable-companies.service';
import { SearchCompanyBoxService } from '../search-company-box/search-company-box.service';

@Injectable()
export class SearchCompanyService
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  private _allPages = 0;
  private _currentPage = 1;
  private _searchQuery = '';
  private _filter: CompanyFilterModel = DEF_FILTER;
  private _pageableLimit: PageableLimitsUnion = pageableLimits[0];

  constructor(
    private readonly _router: Router,
    private readonly _companyHttpService: CompanyHttpService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _companyFilterService: CompanyFilterService,
    private readonly _pageableLimitService: PageableLimitService,
    private readonly _searchCompanyBoxSerivce: SearchCompanyBoxService,
    private readonly _pageableCompaniesService: PageableCompaniesService
  ) {
    super();
    this._pageableLimitService.pageableLimit$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(l => (this._pageableLimit = l));
    this._searchCompanyBoxSerivce.searchContent$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(s => (this._searchQuery = s));
    this._companyFilterService.filter$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(f => (this._filter = f));
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  pushNewParaphrase(paraphrase: string): void {
    this._pageableCompaniesService.toggleLazyLoader(true);
    this._searchCompanyBoxSerivce.pushNewParaphrase(paraphrase);
  }

  loadPageable$(isRefresh = false): Observable<PrePageableData> {
    this._pageableCompaniesService.toggleLazyLoader(true);
    if (isRefresh) {
      this._currentPage = 1;
      this._pageableCompaniesService.setCurrentPage(1);
    }
    return this._companyHttpService
      .getPageableAllData$(this._searchQuery, this._pageableLimit, this._filter)
      .pipe(
        tap(res => this.updateCountOfPages(res)),
        catchError(err => this.onThrowError$(err))
      );
  }

  loadFilteredCompanies$(): Observable<CompanyResDtoModel[]> {
    this._pageableCompaniesService.toggleLazyLoader(true);
    const offset = (this._currentPage - 1) * this._pageableLimit;
    return this._companyHttpService
      .getAllCompaniesByQuery$(
        this._searchQuery,
        this._pageableLimit,
        offset,
        this._filter
      )
      .pipe(
        tap(res => {
          this._pageableCompaniesService.setCompanies(
            Utils.convertCompaniesDotsToCommas(res.results)
          );
          this._pageableCompaniesService.setTotalCount(res.count);
          this._pageableCompaniesService.toggleLazyLoader(false);
        }),
        catchError(err => this.onThrowError$(err))
      );
  }

  moveToPage$(pageNumber: number): Observable<CompanyResDtoModel[] | null> {
    if (pageNumber < 0 || pageNumber > this._allPages) {
      return of(null);
    }
    this._currentPage = pageNumber;
    this._pageableCompaniesService.setCurrentPage(pageNumber);
    return this.loadFilteredCompanies$();
  }

  private updateCountOfPages(res: PrePageableData): void {
    this._pageableCompaniesService.setPageable(res);
    this._allPages = res.countAllPages;
  }

  private onThrowError$(err: any): Observable<any> {
    this._router.navigate(['/']).then(r => r);
    this._pageableCompaniesService.toggleLazyLoader(false);
    this._toastMessageService.showToast(
      Utils.getGenericErr(err),
      ToastType.DANGER
    );
    return throwError(err);
  }
}
