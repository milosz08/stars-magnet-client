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

import { catchError, mergeMap, Observable, of, takeUntil, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { ToastType } from "../../../commons/models/toast.model";
import { ICompanyResDtoModel } from "../../models/company.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";
import { IPrePageableData, pageableLimits, PageableLimitsUnion } from "../../../commons/models/pagination.model";

import { PageableCompaniesService } from "../pageable-companies/pageable-companies.service";
import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";
import { CompanyHttpService } from "../../../commons/http-services/company-http/company-http.service";
import { PageableLimitService } from "../../../commons/services/pageable-limit/pageable-limit.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class CompaniesCategoryService extends AbstractComponentReactiveProvider implements OnDestroy {

    private _allPages = 1;
    private _currentPage = 1;
    private _categoryId!: number;
    private _pageableLimit: PageableLimitsUnion = pageableLimits[0];

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _companyHttpService: CompanyHttpService,
        private _toastMessageService: ToastMessageService,
        private _pageableLimitService: PageableLimitService,
        private _pageableCompaniesService: PageableCompaniesService,
    ) {
        super();
        this._pageableLimitService.pageableLimit$.pipe(takeUntil(this._unsubscribe))
            .subscribe(data => this._pageableLimit = data);
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    loadPageable$(categoryId: number): Observable<any> {
        this._lazyLoaderService.forcedActivateLoader();
        this._categoryId = categoryId;
        return this._companyHttpService.getPageableData(categoryId, this._pageableLimit).pipe(
            tap(res => {
                this.updateCountOfPages(res);
                this._lazyLoaderService.forcedInactivateLoader();
            }),
            catchError(err => this.onThrowError$(err)),
        );
    };

    refreshPageable$(): Observable<any> {
        this._pageableCompaniesService.toggleLazyLoader(true);
        this._currentPage = 1;
        this._pageableCompaniesService.setCurrentPage(0);
        return this._companyHttpService.getPageableData(this._categoryId, this._pageableLimit).pipe(
            tap(res => this.updateCountOfPages(res)),
            catchError(err => this.onThrowError$(err)),
        );
    };

    loadCompaniesByCategory$(): Observable<string | any> {
        this._pageableCompaniesService.toggleLazyLoader(true);
        const offset = (this._currentPage - 1) * this._pageableLimit;
        return this._companyHttpService
            .getAllCompaniesByCategory(this._categoryId, this._pageableLimit, offset).pipe(
                mergeMap(res => {
                    this._pageableCompaniesService.setCompanies(Utils.convertCompaniesDotsToCommas(res.results));
                    this._pageableCompaniesService.setTotalCount(res.count);
                    this._pageableCompaniesService.toggleLazyLoader(false);
                    return of(res.category);
                }),
                catchError(err => this.onThrowError$(err)),
        );
    };

    moveToPage$(pageNumber: number | undefined): Observable<ICompanyResDtoModel[] | any> {
        if (pageNumber === undefined || pageNumber < 0 || pageNumber >= this._allPages) {
            return of(null);
        }
        this._currentPage = pageNumber + 1;
        this._pageableCompaniesService.setCurrentPage(pageNumber);
        return this.loadCompaniesByCategory$();
    };

    private onThrowError$(err: any): Observable<any> {
        this._router.navigate([ "/" ]).then(r => r);
        this._toastMessageService.showToast(Utils.getGenericErr(err), ToastType.DANGER);
        return throwError(err);
    };

    private updateCountOfPages(res: IPrePageableData): void {
        this._pageableCompaniesService.setPageable(res);
        this._allPages = res.countAllPages;
    };
}
