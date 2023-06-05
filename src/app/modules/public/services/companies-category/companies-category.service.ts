/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: companies-category.service.ts
 * Last modified: 6/4/23, 10:54 PM
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

import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, catchError, mergeMap, Observable, of, takeUntil, tap, throwError } from "rxjs";

import { AlertType } from "../../../commons/utils/alert.type";
import { ICompanyResDtoModel } from "../../models/company.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { IPrePageableData, PageableLimitsUnion } from "../../../commons/models/pagination.model";
import { TemplatePageTitleStrategy } from "../../../commons/strategies/template-page-title.strategy";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { CompanyHttpService } from "../../../commons/http-services/company-http/company-http.service";
import { PageableLimitService } from "../../../commons/services/pageable-limit/pageable-limit.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class CompaniesCategoryService extends AbstractComponentReactiveProvider implements OnDestroy {

    private _allPages = 1;
    private _currentPage = 1;
    private _categoryId!: number;
    private _pageableLimit: PageableLimitsUnion = 10;

    private _alertError$: BehaviorSubject<IResponseAlertModel> = new BehaviorSubject<IResponseAlertModel>({
        type: AlertType.ERROR, content: ""
    });

    private _pageable$: BehaviorSubject<IPrePageableData | null> = new BehaviorSubject<IPrePageableData | null>(null);
    private _companies$: BehaviorSubject<ICompanyResDtoModel[]> = new BehaviorSubject<ICompanyResDtoModel[]>([]);

    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _companyHttpService: CompanyHttpService,
        private _pageableLimitService: PageableLimitService,
        private _templatePageTitleStrategy: TemplatePageTitleStrategy,
    ) {
        super();
        this._pageableLimitService.pageableLimit$.pipe(takeUntil(this._unsubscribe))
            .subscribe(data => this._pageableLimit = data);
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    loadPageable(categoryId: number): Observable<any> {
        this._lazyLoaderService.forcedActivateLoader();
        this._categoryId = categoryId;
        return this._companyHttpService.getPageableData(categoryId, this._pageableLimit).pipe(
            tap(res => {
                this.updateCountOfPages(res);
                this._lazyLoaderService.forcedInactivateLoader();
            }),
            catchError(err => this.onThrowError(err)),
        );
    };

    refreshPageable(): Observable<any> {
        this._lazyLoader$.next(true);
        this._currentPage = 1;
        this._currentPage$.next(0);
        return this._companyHttpService.getPageableData(this._categoryId, this._pageableLimit).pipe(
            tap(res => this.updateCountOfPages(res)),
            catchError(err => this.onThrowError(err)),
        );
    };

    loadCompaniesByCategory(): Observable<string | any> {
        this._lazyLoader$.next(true);
        const offset = (this._currentPage - 1) * this._pageableLimit;
        return this._companyHttpService
            .getAllCompaniesByCategory(this._categoryId, this._pageableLimit, offset).pipe(
                mergeMap(res => {
                    this._companies$.next(res.results.map(comp => {
                        comp.avgRatings = comp.avgRatings ? comp.avgRatings.toString().replaceAll(".", ",") : "-"
                        return comp;
                    }));
                    this._totalCount$.next(res.count);
                    this._lazyLoader$.next(false);
                    return of(res.category);
                }),
                catchError(err => this.onThrowError(err)),
        );
    };

    moveToPage(pageNumber: number | undefined): Observable<ICompanyResDtoModel[] | any> {
        if (pageNumber === undefined || pageNumber < 0 || pageNumber >= this._allPages) {
            return of(null);
        }
        this._currentPage = pageNumber + 1;
        this._currentPage$.next(pageNumber);
        return this.loadCompaniesByCategory();
    };

    private onThrowError(err: any): Observable<any> {
        this._router.navigate([ "/" ]).then(r => r);
        return throwError(err);
    };

    private updateCountOfPages(res: IPrePageableData): void {
        this._pageable$.next(res);
        this._allPages = res.countAllPages;
    };

    get alertError$(): Observable<IResponseAlertModel> { return this._alertError$.asObservable(); };
    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
    get companies$(): Observable<ICompanyResDtoModel[]> { return this._companies$.asObservable(); };
    get totalCount$(): Observable<number> { return this._totalCount$.asObservable(); };
    get pageable$(): Observable<IPrePageableData | null> { return this._pageable$.asObservable(); };
    get currentPage$(): Observable<number> { return this._currentPage$.asObservable(); };
}
