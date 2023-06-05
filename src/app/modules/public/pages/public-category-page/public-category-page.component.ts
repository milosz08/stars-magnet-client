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

import { takeUntil } from "rxjs";

import { TemplatePageTitleStrategy } from "../../../commons/strategies/template-page-title.strategy";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { RouterHelperService } from "../../../commons/services/router-helper/router-helper.service";
import { CompaniesCategoryService } from "../../services/companies-category/companies-category.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-public-category-page",
    templateUrl: "./public-category-page.component.html",
    styleUrls: [ "./public-category-page.component.scss" ],
    providers: [ CompaniesCategoryService, RouterHelperService ],
})
export class PublicCategoryPageComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    categoryId!: number | null;
    categoryName = "";

    constructor(
        private _routerHelperService: RouterHelperService,
        private _companiesCategoryService: CompaniesCategoryService,
        private _templatePageTitleStrategy: TemplatePageTitleStrategy
    ) {
        super();
    };

    ngOnInit(): void {
        this.categoryId = this._routerHelperService.getIntFromRouteAndParse("categoryId", "/");
        this._companiesCategoryService.loadPageable(this.categoryId).pipe(takeUntil(this._unsubscribe)).subscribe();
        this._companiesCategoryService.loadCompaniesByCategory().pipe(takeUntil(this._unsubscribe))
            .subscribe(categoryName => {
                this.categoryName = categoryName;
                this._templatePageTitleStrategy.createCustomTitle(categoryName);
            });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };
}
