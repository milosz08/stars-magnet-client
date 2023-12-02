/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { CategoryModel } from '~/app-public/models/category.model';
import { CategoriesService } from '~/app-public/services/categories/categories.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss'],
  providers: [CategoriesService, LazyCommonsService],
})
export class HomeCategoriesComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  categories: CategoryModel[] = [];
  pageable: PrePageableData | null = null;

  lazyLoader$: Observable<boolean> = this._lazyCommonsService.lazyLoader$;
  alertError$: Observable<ResponseAlertModel> =
    this._lazyCommonsService.responseAlert$;

  currentPage$: Observable<number> = this._categoriesService.currentPage$;
  isPrevDisabled$: Observable<boolean> =
    this._categoriesService.isPrevDisabled$;
  isNextDisabled$: Observable<boolean> =
    this._categoriesService.isNextDisabled$;

  constructor(
    private readonly _categoriesService: CategoriesService,
    private readonly _lazyCommonsService: LazyCommonsService
  ) {
    super();
  }

  ngOnInit(): void {
    this._categoriesService
      .loadPageable$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(p => (this.pageable = p));
    this._categoriesService
      .loadCategories$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(c => (this.categories = c));
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onPreviousCategoriesPage(): void {
    this._categoriesService
      .gotoPreviousPage$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(c => (this.categories = c!));
  }

  onNextCategoriesPage(): void {
    this._categoriesService
      .gotoNextPage$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(c => (this.categories = c!));
  }
}
