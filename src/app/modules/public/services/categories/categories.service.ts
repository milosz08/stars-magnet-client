/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { CategoriesHttpService } from '~/app-commons/http-services/categories-http/categories-http.service';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { LazyLoaderService } from '~/app-commons/services/lazy-loader/lazy-loader.service';
import { CategoryModel } from '~/app-public/models/category.model';

@Injectable()
export class CategoriesService {
  private _currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  private _isPrevDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private _isNextDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  private _currentPage: number = 1;
  private _allPages: number = 1;
  private _isInitialLoad: boolean = true;
  private readonly _fixedPageableLimit = 6;

  constructor(
    private readonly _lazyLoaderService: LazyLoaderService,
    private readonly _lazyCommonsService: LazyCommonsService,
    private readonly _categoriesHttpService: CategoriesHttpService
  ) {}

  loadPageable$(): Observable<PrePageableData> {
    this._lazyLoaderService.forcedActivateLoader();
    return this._categoriesHttpService
      .getPageableData$(this._fixedPageableLimit)
      .pipe(
        map(res => {
          this._allPages = res.countAllPages;
          this.updatePrevNextDisabledButtons();
          this._lazyLoaderService.forcedInactivateLoader();
          return res;
        }),
        catchError(err => {
          this._lazyCommonsService.populateErrorAlert(err);
          if (!this._isInitialLoad) {
            this._lazyLoaderService.forcedInactivateLoader();
          }
          return throwError(err);
        })
      );
  }

  loadCategories$(): Observable<CategoryModel[]> {
    this._lazyCommonsService.setLazyLoader(true);
    const offset = (this._currentPage - 1) * this._fixedPageableLimit;
    return this._categoriesHttpService
      .getCategories$(this._fixedPageableLimit, offset)
      .pipe(
        map(res => res.results),
        map(results => {
          this.disableLazyLoading();
          return results;
        }),
        catchError(err => {
          this.disableLazyLoading();
          this._lazyCommonsService.populateErrorAlert(err);
          return throwError(err);
        })
      );
  }

  gotoNextPage$(): Observable<CategoryModel[] | null> {
    if (this._currentPage++ >= this._allPages) return of(null);
    this.updatePrevNextDisabledButtons();
    return this.loadCategories$();
  }

  gotoPreviousPage$(): Observable<CategoryModel[] | null> {
    if (this._currentPage-- <= 1) return of(null);
    this.updatePrevNextDisabledButtons();
    return this.loadCategories$();
  }

  private disableLazyLoading(): void {
    this._lazyLoaderService.forcedInactivateLoader();
    this._isInitialLoad = false;
    this._lazyCommonsService.setLazyLoader(false);
  }

  private updatePrevNextDisabledButtons(): void {
    this._currentPage$.next(this._currentPage);
    this._isPrevDisabled$.next(this._currentPage <= 1);
    this._isNextDisabled$.next(this._currentPage >= this._allPages);
  }

  get currentPage$(): Observable<number> {
    return this._currentPage$;
  }
  get isPrevDisabled$(): Observable<boolean> {
    return this._isPrevDisabled$;
  }
  get isNextDisabled$(): Observable<boolean> {
    return this._isNextDisabled$;
  }
}
