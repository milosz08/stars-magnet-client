/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: toast-message.component.ts
 * Last modified: 6/7/23, 2:46 AM
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

import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { IToastModel, ToastType } from "../../models/toast.model";
import { ToastMessageService } from "../../services/toast-message/toast-message.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-toast-message",
    templateUrl: "./toast-message.component.html",
    host: { class: "position-fixed m-3 end-0" },
})
export class ToastMessageComponent {

    toasts$: Observable<IToastModel[]> = this._toastMessageService.toasts$;
    dangerToast = ToastType.DANGER;

    constructor(
        private _toastMessageService: ToastMessageService,
    ) {
    };

    handleRemoveToast(removedToast: IToastModel): void {
        this._toastMessageService.removeToast(removedToast);
    };
}
