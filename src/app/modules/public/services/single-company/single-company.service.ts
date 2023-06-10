/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: single-company.service.ts
 * Last modified: 6/9/23, 5:23 PM
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
import { Router } from "@angular/router";

import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { ToastType } from "../../../commons/models/toast.model";
import { ICompanyResDtoModel } from "../../models/company.model";

import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";
import { CompanyHttpService } from "../../../commons/http-services/company-http/company-http.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class SingleCompanyService {

    private _companyDetails$: BehaviorSubject<ICompanyResDtoModel | null> = new BehaviorSubject<ICompanyResDtoModel | null>(null);
    private _starsStructure$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _toastMessageService: ToastMessageService,
        private _companyHttpService: CompanyHttpService,
    ) {
    };

    loadCompanyDetails$(companyId: number): Observable<ICompanyResDtoModel> {
        this._lazyLoaderService.forcedActivateLoader();
        return this._companyHttpService.getSingleCompany$(companyId).pipe(
            map(res => {
                const parsedRes = this.parseCompanyDetails(res);
                this._companyDetails$.next(res);
                this._starsStructure$.next(Utils.generateStarsStructure(String(parsedRes.avgRatings)));
                this._lazyLoaderService.forcedInactivateLoader();
                return res;
            }),
            catchError(err => this.onCatchError(err)),
        );
    };

    refreshCompanyDetails$(companyId: number): Observable<any> {
        this._lazyLoader$.next(true);
        return this._companyHttpService.getSingleCompany$(companyId).pipe(
            tap(res => {
                const parsedRes = this.parseCompanyDetails(res);
                this._companyDetails$.next(res);
                this._starsStructure$.next(Utils.generateStarsStructure(String(parsedRes.avgRatings)))
                this._lazyLoader$.next(false);
            }),
            catchError(err => this.onCatchError(err)),
        );
    };

    private parseCompanyDetails(res: ICompanyResDtoModel): ICompanyResDtoModel {
        const avgRatings = String(res.avgRatings);
        res.avgRatings = avgRatings.replaceAll(".", ",");
        if (/^\d+$/.test(avgRatings)) {
            res.avgRatings += ",0";
        }
        return res;
    };

    private onCatchError(err: any): Observable<any> {
        this._lazyLoader$.next(false);
        this._router.navigate([ "/companies" ]).then(() => {
            this._lazyLoaderService.forcedInactivateLoader();
            this._toastMessageService.showToast(Utils.getGenericErr(err), ToastType.DANGER);
        });
        return throwError(err);
    }

    get companyDetails$(): Observable<ICompanyResDtoModel | null> { return this._companyDetails$.asObservable(); };
    get starsStructure$(): Observable<string[]> { return this._starsStructure$.asObservable(); };
    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
}
