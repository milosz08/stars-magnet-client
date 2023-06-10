/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: company-opinion.service.ts
 * Last modified: 6/9/23, 5:24 PM
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

import { BehaviorSubject, catchError, Observable, of, takeUntil, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { ToastType } from "../../../commons/models/toast.model";
import { IOpinionResDtoModel } from "../../../commons/models/opinion.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";
import { IPrePageableData, pageableLimits, PageableLimitsUnion } from "../../../commons/models/pagination.model";

import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";
import { LoggedStatusService } from "../../../commons/services/logged-status/logged-status.service";
import { PageableLimitService } from "../../../commons/services/pageable-limit/pageable-limit.service";
import { OpinionsHttpService } from "../../../commons/http-services/opinions-http/opinions-http.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class CompanyOpinionService extends AbstractComponentReactiveProvider implements OnDestroy {

    private _pageable$: BehaviorSubject<IPrePageableData | null> = new BehaviorSubject<IPrePageableData | null>(null);
    private _opinions$: BehaviorSubject<IOpinionResDtoModel[]> = new BehaviorSubject<IOpinionResDtoModel[]>([]);
    private _alreadyAdded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    private _userId!: number;
    private _allPages = 0;
    private _currentPage = 1;
    private _companyId!: number;
    private _pageableLimit: PageableLimitsUnion = pageableLimits[0];

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _toastMessageService: ToastMessageService,
        private _loggedStatusService: LoggedStatusService,
        private _opinionsHttpService: OpinionsHttpService,
        private _pageableLimitService: PageableLimitService,
    ) {
        super();
        this._pageableLimitService.pageableLimit$.pipe(takeUntil(this._unsubscribe)).subscribe(l => this._pageableLimit = l);
        this._loggedStatusService.loggedDetails$.pipe(takeUntil(this._unsubscribe))
            .subscribe(d => { if (d) this._userId = d.id });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    loadPageable$(companyId: number): Observable<IPrePageableData> {
        this._lazyLoaderService.forcedActivateLoader();
        this._companyId = companyId;
        return this._opinionsHttpService.getAllOpinionsPageable$(companyId, this._pageableLimit).pipe(
            tap(res => {
                this.updateCountOfPages(res);
                this._lazyLoaderService.forcedInactivateLoader();
            }),
            catchError(err => this.onThrowError$(err)),
        );
    };

    refreshPageable$(): Observable<IPrePageableData> {
        this._lazyLoader$.next(true);
        this._currentPage = 1;
        this._currentPage$.next(1);
        return this._opinionsHttpService.getAllOpinionsPageable$(this._companyId, this._pageableLimit).pipe(
            tap(res => this.updateCountOfPages(res)),
            catchError(err => this.onThrowError$(err)),
        );
    };

    loadOpinions$(): Observable<IOpinionResDtoModel[]> {
        this._lazyLoader$.next(true);
        const offset = (this._currentPage - 1) * this._pageableLimit;
        return this._opinionsHttpService.getAllOpinions$(this._companyId, this._pageableLimit, offset).pipe(
            tap(res => {
                res.results = res.results.map(r => {
                    r.commentDate = new Date(r.commentDate);
                    return r;
                }).sort((x, y) => y.commentDate.getTime() - x.commentDate.getTime()); // desc sorting
                this._opinions$.next(res.results);
                this.checkIfUserAlreadyAddedOpinion(res.results.map(r => r.userId));
                this._lazyLoader$.next(false);
            }),
            catchError(err => this.onThrowError$(err)),
        );
    };

    checkIfUserAlreadyAddedOpinion(userIds: number[]): void {
        this._alreadyAdded$.next(userIds.includes(this._userId));
    };

    moveToPage$(pageNumber: number): Observable<IOpinionResDtoModel[] | null> {
        if (pageNumber < 1 || pageNumber > this._allPages) {
            return of(null);
        }
        this._currentPage = pageNumber;
        this._currentPage$.next(pageNumber);
        return this.loadOpinions$();
    };

    private onThrowError$(err: any): Observable<any> {
        this._router.navigate([ "/companies" ]).then(r => r);
        this._toastMessageService.showToast(Utils.getGenericErr(err), ToastType.DANGER);
        return throwError(err);
    };

    private updateCountOfPages(res: IPrePageableData): void {
        this._pageable$.next(res);
        this._allPages = res.countAllPages;
    };

    get pageable$(): Observable<IPrePageableData | null> { return this._pageable$.asObservable(); };
    get opinions$(): Observable<IOpinionResDtoModel[]> { return this._opinions$.asObservable(); };
    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
    get currentPage$(): Observable<number> { return this._currentPage$.asObservable(); };
    get alreadyAdded$(): Observable<boolean> { return this._alreadyAdded$.asObservable(); };
}
