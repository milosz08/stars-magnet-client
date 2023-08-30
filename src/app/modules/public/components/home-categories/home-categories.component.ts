/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: home-categories.component.ts
 *   Created at: 2023-06-04, 11:44:08
 *   Last updated at: 2023-08-30, 22:27:28
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
