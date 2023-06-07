/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: toast-message.service.ts
 * Last modified: 6/7/23, 2:48 AM
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

import { BehaviorSubject, Observable } from "rxjs";

import { IToastModel, ToastType } from "../../models/toast.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class ToastMessageService {

    private _toasts: IToastModel[] = [];
    private _toasts$: BehaviorSubject<IToastModel[]> = new BehaviorSubject<IToastModel[]>([]);

    showToast(message: string, type: ToastType): void {
        this._toasts.push({ enabled: true, content: message, type });
        this._toasts$.next(this._toasts);
    };

    removeToast(toast: IToastModel): void {
        this._toasts = this._toasts.filter(t => t != toast);
        this._toasts$.next(this._toasts);
    };

    get toasts$(): Observable<IToastModel[]> { return this._toasts$.asObservable(); };
}
