/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  mergeMap,
  of,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
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
import { LazyLoaderService } from '~/app-commons/services/lazy-loader/lazy-loader.service';
import { PageableLimitService } from '~/app-commons/services/pageable-limit/pageable-limit.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyResDtoModel } from '~/app-public/models/company.model';
import { CompanyFilterService } from '../company-filter/company-filter.service';
import { PageableCompaniesService } from '../pageable-companies/pageable-companies.service';

@Injectable()
export class CompaniesCategoryService
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  private _allPages = 0;
  private _currentPage = 1;
  private _categoryId!: number;
  private _filter: CompanyFilterModel = DEF_FILTER;
  private _pageableLimit: PageableLimitsUnion = pageableLimits[0];

  constructor(
    private readonly _router: Router,
    private readonly _lazyLoaderService: LazyLoaderService,
    private readonly _companyHttpService: CompanyHttpService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _companyFilterService: CompanyFilterService,
    private readonly _pageableLimitService: PageableLimitService,
    private readonly _pageableCompaniesService: PageableCompaniesService
  ) {
    super();
    this._pageableLimitService.pageableLimit$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(l => (this._pageableLimit = l));
    this._companyFilterService.filter$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(f => (this._filter = f));
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  loadPageable$(categoryId: number): Observable<PrePageableData> {
    this._lazyLoaderService.forcedActivateLoader();
    this._categoryId = categoryId;
    return this._companyHttpService
      .getPageableData$(categoryId, this._pageableLimit, this._filter)
      .pipe(
        tap(res => {
          this.updateCountOfPages(res);
          this._lazyLoaderService.forcedInactivateLoader();
        }),
        catchError(err => this.onThrowError$(err))
      );
  }

  refreshPageable$(): Observable<PrePageableData> {
    this._pageableCompaniesService.toggleLazyLoader(true);
    this._currentPage = 1;
    this._pageableCompaniesService.setCurrentPage(1);
    return this._companyHttpService
      .getPageableData$(this._categoryId, this._pageableLimit, this._filter)
      .pipe(
        tap(res => this.updateCountOfPages(res)),
        catchError(err => this.onThrowError$(err))
      );
  }

  loadCompaniesByCategory$(): Observable<string | any> {
    this._pageableCompaniesService.toggleLazyLoader(true);
    const offset = (this._currentPage - 1) * this._pageableLimit;
    return this._companyHttpService
      .getAllCompaniesByCategory$(
        this._categoryId,
        this._pageableLimit,
        offset,
        this._filter
      )
      .pipe(
        mergeMap(res => {
          this._pageableCompaniesService.setCompanies(
            Utils.convertCompaniesDotsToCommas(res.results)
          );
          this._pageableCompaniesService.setTotalCount(res.count);
          this._pageableCompaniesService.toggleLazyLoader(false);
          return of(res.category);
        }),
        catchError(err => this.onThrowError$(err))
      );
  }

  moveToPage$(pageNumber: number): Observable<CompanyResDtoModel[] | any> {
    if (pageNumber < 1 || pageNumber > this._allPages) {
      return of(null);
    }
    this._currentPage = pageNumber;
    this._pageableCompaniesService.setCurrentPage(pageNumber);
    return this.loadCompaniesByCategory$();
  }

  private onThrowError$(err: any): Observable<any> {
    this._router.navigate(['/']).then(r => r);
    this._toastMessageService.showToast(
      Utils.getGenericErr(err),
      ToastType.DANGER
    );
    return throwError(err);
  }

  private updateCountOfPages(res: PrePageableData): void {
    this._pageableCompaniesService.setPageable(res);
    this._allPages = res.countAllPages;
  }
}
