/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: add-company.service.ts
 * Last modified: 6/4/23, 1:33 PM
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

import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { AlertType } from "../../../commons/utils/alert.type";
import { ToastType } from "../../../commons/models/toast.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { IMultiselectItemModel } from "../../../commons/models/multiselect-input.model";
import { IAddCompanyFormModel, IAddCompanyReqDto, IPassCompanyResDto } from "../../../commons/models/company.model";

import { LazyLoaderService } from "../../../commons/services/lazy-loader/lazy-loader.service";
import { CompanyCredentialsService } from "../company-credentials/company-credentials.service";
import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";
import { CompanyHttpService } from "../../../commons/http-services/company-http/company-http.service";
import { CategoriesHttpService } from "../../../commons/http-services/categories-http/categories-http.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AddCompanyService {

    private _suspenseSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _responseAlert$: BehaviorSubject<IResponseAlertModel> = new BehaviorSubject<IResponseAlertModel>({
        type: AlertType.ERROR, content: "",
    });

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _toastMessageService: ToastMessageService,
        private _addCompanyHttpService: CompanyHttpService,
        private _categoriesHttpService: CategoriesHttpService,
        private _addedCompanyCredentialsService: CompanyCredentialsService,
    ) {
    };

    addCompany$(formReq: IAddCompanyFormModel): Observable<IPassCompanyResDto> {
        this._suspenseSpinner$.next(true);
        const reqData: IAddCompanyReqDto = Utils.convertCamelToSnake(formReq);
        reqData.categories = formReq.categories;
        return this._addCompanyHttpService.addCompany$(reqData).pipe(
            tap(res => {
                this._addedCompanyCredentialsService.assignCredentials(res);
                this._suspenseSpinner$.next(false);
                this._router.navigate([ "/auth/company-credentials" ]).then(r => r);
            }),
            catchError(err => {
                this._suspenseSpinner$.next(false);
                const resMessage = Utils.getFirstObjectErrorValue(err.error);
                this._responseAlert$.next({ type: AlertType.ERROR, content: `${resMessage || "Unknow server error"}.` });
                return throwError(err);
            }),
        );
    };

    getAllCategories$(): Observable<IMultiselectItemModel[]> {
        this._lazyLoaderService.forcedActivateLoader();
        return this._categoriesHttpService.getAllCategories$().pipe(
            tap(res => {
                this._lazyLoaderService.forcedInactivateLoader();
                return res;
            }),
            catchError(err => {
                this._router.navigate([ "/" ]).then(() => {
                    this._lazyLoaderService.forcedInactivateLoader();
                    this._toastMessageService.showToast(Utils.getGenericErr(err), ToastType.DANGER);
                });
                return throwError(err);
            }),
        );
    };

    get suspenseSpinner$(): Observable<boolean>                     { return this._suspenseSpinner$.asObservable(); };
    get responseAlert$(): Observable<IResponseAlertModel>           { return this._responseAlert$.asObservable(); };
}
