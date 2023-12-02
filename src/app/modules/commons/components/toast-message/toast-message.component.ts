/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
