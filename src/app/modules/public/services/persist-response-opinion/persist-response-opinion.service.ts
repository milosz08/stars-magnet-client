/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: persist-response-opinion.service.ts
 * Last modified: 6/10/23, 9:28 AM
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

import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { ToastType } from "../../../commons/models/toast.model";
import { IAddOpinionResDtoModel, IAddResponseOpinionReqDtoModel } from "../../../commons/models/opinion.model";

import { ToastMessageService } from "../../../commons/services/toast-message/toast-message.service";
import { OpinionsHttpService } from "../../../commons/http-services/opinions-http/opinions-http.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class PersistResponseOpinionService {

    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private _opinionsHttpService: OpinionsHttpService,
        private _toastMessageService: ToastMessageService,
    ) {
    };

    persistResponseToOpinion$(comment: string, userId: number): Observable<IAddOpinionResDtoModel> {
        this._lazyLoader$.next(true);
        const reqDto: IAddResponseOpinionReqDtoModel = { companyResponse: comment, userId };
        return this._opinionsHttpService.reponseToOpinion$(reqDto).pipe(
            tap(res => {
                this._lazyLoader$.next(false);
                this._toastMessageService.showToast(res.response, ToastType.INFO);
                return res;
            }),
            catchError(err => {
                this._lazyLoader$.next(false);
                this._toastMessageService.showToast(Utils.getFirstObjectErrorValue(err.error), ToastType.DANGER);
                return throwError(err);
            }),
        );
    };

    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
}
