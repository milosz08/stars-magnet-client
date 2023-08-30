/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: toast-message.service.ts
 *   Created at: 2023-06-07, 02:48:55
 *   Last updated at: 2023-08-30, 22:55:14
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
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastModel, ToastType } from '~/app-commons/models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  private _toasts: ToastModel[] = [];
  private _toasts$: BehaviorSubject<ToastModel[]> = new BehaviorSubject<
    ToastModel[]
  >([]);

  showToast(message: string, type: ToastType): void {
    this._toasts.push({ enabled: true, content: message, type });
    this._toasts$.next(this._toasts);
  }

  removeToast(toast: ToastModel): void {
    this._toasts = this._toasts.filter(t => t != toast);
    this._toasts$.next(this._toasts);
  }

  get toasts$(): Observable<ToastModel[]> {
    return this._toasts$.asObservable();
  }
}
