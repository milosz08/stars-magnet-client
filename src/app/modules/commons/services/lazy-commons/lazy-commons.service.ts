/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: lazy-commons.service.ts
 *   Created at: 2023-06-07, 21:18:07
 *   Last updated at: 2023-08-30, 22:52:34
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
