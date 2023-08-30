/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: public-category-page.component.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:18:27
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
import { RouterHelperService } from '~/app-commons/services/router-helper/router-helper.service';
import { TemplatePageTitleStrategy } from '~/app-commons/strategies/template-page-title.strategy';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { CompaniesCategoryService } from '~/app-public/services/companies-category/companies-category.service';
import { PageableCompaniesService } from '~/app-public/services/pageable-companies/pageable-companies.service';

@Component({
  selector: 'app-public-category-page',
  templateUrl: './public-category-page.component.html',
  providers: [
    CompaniesCategoryService,
    PageableCompaniesService,
    RouterHelperService,
  ],
})
export class PublicCategoryPageComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  categoryName = '';
  totalCount$: Observable<number> = this._pageableCompanyService.totalCount$;

  constructor(
    private readonly _routerHelperService: RouterHelperService,
    private readonly _pageableCompanyService: PageableCompaniesService,
    private readonly _companiesCategoryService: CompaniesCategoryService,
    private readonly _templatePageTitleStrategy: TemplatePageTitleStrategy
  ) {
    super();
  }

  ngOnInit(): void {
    this._routerHelperService.checkAndExtractParamId(
      'categoryId',
      '/',
      categoryId => this.loadContent(Number(categoryId))
    );
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  private loadContent(categoryId: number): void {
    this._companiesCategoryService
      .loadPageable$(categoryId)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
    this._companiesCategoryService
      .loadCompaniesByCategory$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(categoryName => {
        this.categoryName = categoryName;
        this._templatePageTitleStrategy.createCustomTitle(categoryName);
      });
  }

  onChangePage(page: number): void {
    this._companiesCategoryService
      .moveToPage$(page)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }

  refreshCompanies(): void {
    this._companiesCategoryService
      .refreshPageable$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
    this._companiesCategoryService
      .loadCompaniesByCategory$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }
}
