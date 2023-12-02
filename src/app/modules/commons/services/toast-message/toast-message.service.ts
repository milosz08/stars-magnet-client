/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
