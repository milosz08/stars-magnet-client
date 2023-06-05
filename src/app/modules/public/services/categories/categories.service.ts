/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: categories.service.ts
 * Last modified: 6/4/23, 12:40 PM
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

import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { AlertType } from "../../../commons/utils/alert.type";
import { ICategoryModel } from "../../models/category.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";

import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { CategoriesHttpService } from "../../../commons/http-services/categories-http/categories-http.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class CategoriesService {

    private _categories$: BehaviorSubject<ICategoryModel[]> = new BehaviorSubject<ICategoryModel[]>([]);
    private _pageable$: BehaviorSubject<IPrePageableData | null> = new BehaviorSubject<IPrePageableData | null>(null);

    private _alertError$: BehaviorSubject<IResponseAlertModel> = new BehaviorSubject<IResponseAlertModel>({
        type: AlertType.ERROR, content: ""
    });

    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);
    private _isPrevDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private _isNextDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private _currentPage: number = 1;
    private _allPages: number = 1;
    private _isInitialLoad: boolean = true;
    private readonly _fixedPageableLimit = 6;

    constructor(
        private _lazyLoaderService: LazyLoaderService,
        private _categoriesHttpService: CategoriesHttpService,
    ) {
    };

    loadPageable(): Observable<any> {
        this._lazyLoaderService.forcedActivateLoader();
        return this._categoriesHttpService.getPageableData(this._fixedPageableLimit).pipe(
            tap(res => {
                this._pageable$.next(res);
                this._allPages = res.countAllPages;
                this.updatePrevNextDisabledButtons();
                this._lazyLoaderService.forcedInactivateLoader();
            }),
            catchError(err => {
                Utils.populateErrorAlert(err, this._alertError$);
                if (!this._isInitialLoad) {
                    this._lazyLoaderService.forcedInactivateLoader();
                }
                return throwError(err);
            }),
        );
    };

    loadCategories(): Observable<ICategoryModel[] | any> {
        this._lazyLoader$.next(true);
        const offset = (this._currentPage - 1) * this._fixedPageableLimit;
        return this._categoriesHttpService.getCategories(this._fixedPageableLimit, offset).pipe(
            map(res => res.results),
            tap(results => {
                this._categories$.next(results);
                this.disableLazyLoading();
            }),
            catchError(err => {
                this.disableLazyLoading();
                Utils.populateErrorAlert(err, this._alertError$);
                return throwError(err);
            }),
        );
    };

    gotoNextPage(): Observable<ICategoryModel[] | any> {
        if (this._currentPage++ >= this._allPages) return of(null);
        this.updatePrevNextDisabledButtons();
        return this.loadCategories();
    };

    gotoPreviousPage(): Observable<ICategoryModel[] | any> {
        if (this._currentPage-- <= 1) return of(null);
        this.updatePrevNextDisabledButtons();
        return this.loadCategories();
    };

    private disableLazyLoading(): void {
        this._lazyLoaderService.forcedInactivateLoader();
        this._isInitialLoad = false;
        this._lazyLoader$.next(false);
    };

    private updatePrevNextDisabledButtons(): void {
        this._currentPage$.next(this._currentPage);
        this._isPrevDisabled$.next(this._currentPage <= 1);
        this._isNextDisabled$.next(this._currentPage >= this._allPages);
    };

    get currentPage$(): Observable<number> { return this._currentPage$; };
    get isPrevDisabled$(): Observable<boolean> { return this._isPrevDisabled$ };
    get isNextDisabled$(): Observable<boolean> { return this._isNextDisabled$ };

    get categories$(): Observable<ICategoryModel[]> { return this._categories$.asObservable() };
    get alertError$(): Observable<IResponseAlertModel> { return this._alertError$.asObservable(); };
    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
    get pageable$(): Observable<IPrePageableData | null> { return this._pageable$.asObservable(); };
}
