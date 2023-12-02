/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { AlertType } from '~/app-commons/utils/alert.type';
import { Utils } from '~/app-commons/utils/utils';

@Injectable()
export class LazyCommonsService {
  private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _responseAlert$: BehaviorSubject<ResponseAlertModel> =
    new BehaviorSubject<ResponseAlertModel>({
      type: AlertType.ERROR,
      content: '',
    });

  setLazyLoader(isActive: boolean): void {
    this._lazyLoader$.next(isActive);
  }

  setResponseAlert(alert: ResponseAlertModel): void {
    this._responseAlert$.next(alert);
  }

  populateErrorAlert(err: any): void {
    this._responseAlert$.next({
      type: AlertType.ERROR,
      content: Utils.getGenericErr(err),
    });
  }

  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
  get responseAlert$(): Observable<ResponseAlertModel> {
    return this._responseAlert$.asObservable();
  }
}
