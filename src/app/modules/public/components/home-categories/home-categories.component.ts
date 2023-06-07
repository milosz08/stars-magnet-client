/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: home-categories.component.ts
 * Last modified: 6/4/23, 11:44 AM
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

import { Observable, takeUntil } from "rxjs";

import { ICategoryModel } from "../../models/category.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { CategoriesService } from "../../services/categories/categories.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-home-categories",
    templateUrl: "./home-categories.component.html",
    styleUrls: [ "./home-categories.component.scss" ],
    providers: [ CategoriesService ],
})
export class HomeCategoriesComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    pageable: IPrePageableData | null = null;

    currentPage$: Observable<number> = this._categoriesService.currentPage$;
    lazyLoader$: Observable<boolean> = this._categoriesService.lazyLoader$;
    isPrevDisabled$: Observable<boolean> = this._categoriesService.isPrevDisabled$;
    isNextDisabled$: Observable<boolean> = this._categoriesService.isNextDisabled$;
    categories$: Observable<ICategoryModel[]> = this._categoriesService.categories$;
    alertError$: Observable<IResponseAlertModel> = this._categoriesService.alertError$;

    constructor(
        private _categoriesService: CategoriesService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._categoriesService.loadPageable$().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._categoriesService.loadCategories$().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._categoriesService.pageable$.pipe(takeUntil(this._unsubscribe))
            .subscribe(data => this.pageable = data);
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onPreviousCategoriesPage(): void {
        this._categoriesService.gotoPreviousPage$().pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    onNextCategoriesPage(): void {
        this._categoriesService.gotoNextPage$().pipe(takeUntil(this._unsubscribe)).subscribe();
    };
}
