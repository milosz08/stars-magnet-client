/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: toast-message.component.ts
 *   Created at: 2023-06-07, 02:46:50
 *   Last updated at: 2023-08-30, 22:41:37
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastModel, ToastType } from '~/app-commons/models/toast.model';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  host: { class: 'position-fixed m-3 end-0' },
})
export class ToastMessageComponent {
  toasts$: Observable<ToastModel[]> = this._toastMessageService.toasts$;
  dangerToast = ToastType.DANGER;

  constructor(private readonly _toastMessageService: ToastMessageService) {}

  handleRemoveToast(removedToast: ToastModel): void {
    this._toastMessageService.removeToast(removedToast);
  }
}
