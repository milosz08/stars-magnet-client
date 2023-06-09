/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: public-category-page.component.ts
 * Last modified: 24/05/2023, 16:31
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, takeUntil } from "rxjs";

import { TemplatePageTitleStrategy } from "../../../commons/strategies/template-page-title.strategy";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { RouterHelperService } from "../../../commons/services/router-helper/router-helper.service";
import { CompaniesCategoryService } from "../../services/companies-category/companies-category.service";
import { PageableCompaniesService } from "../../services/pageable-companies/pageable-companies.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-public-category-page",
    templateUrl: "./public-category-page.component.html",
    providers: [ CompaniesCategoryService, PageableCompaniesService, RouterHelperService ],
})
export class PublicCategoryPageComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    categoryName = "";
    totalCount$: Observable<number> = this._pageableCompanyService.totalCount$;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _routerHelperService: RouterHelperService,
        private _pageableCompanyService: PageableCompaniesService,
        private _companiesCategoryService: CompaniesCategoryService,
        private _templatePageTitleStrategy: TemplatePageTitleStrategy,
    ) {
        super();
    };

    ngOnInit(): void {
        this._routerHelperService.checkAndExtractParamId("categoryId", "/",
            categoryId => this.loadContent(Number(categoryId)));
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    private loadContent(categoryId: number): void {
        this._companiesCategoryService.loadPageable$(categoryId).pipe(takeUntil(this._unsubscribe)).subscribe();
        this._companiesCategoryService.loadCompaniesByCategory$().pipe(takeUntil(this._unsubscribe))
            .subscribe(categoryName => {
                this.categoryName = categoryName;
                this._templatePageTitleStrategy.createCustomTitle(categoryName);
            });
    };

    onChangePage(page: number): void {
        this._companiesCategoryService.moveToPage$(page).pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    refreshCompanies(): void {
        this._companiesCategoryService.refreshPageable$().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._companiesCategoryService.loadCompaniesByCategory$().pipe(takeUntil(this._unsubscribe)).subscribe();
    };
}
