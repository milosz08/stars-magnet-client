/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: persist-opinion.service.ts
 *   Created at: 2023-06-10, 05:59:50
 *   Last updated at: 2023-08-30, 22:14:49
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
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { OpinionsHttpService } from '~/app-commons/http-services/opinions-http/opinions-http.service';
import {
  AddOpinionFormModel,
  AddOpinionResDtoModel,
} from '~/app-commons/models/opinion.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { Utils } from '~/app-commons/utils/utils';

@Injectable()
export class PersistOpinionService {
  private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly _opinionsHttpService: OpinionsHttpService,
    private readonly _toastMessageService: ToastMessageService
  ) {}

  persistOpinionByUser$(
    formData: AddOpinionFormModel,
    companyId: number
  ): Observable<AddOpinionResDtoModel> {
    this._lazyLoader$.next(true);
    const { comment, rating } = formData;
    return this._opinionsHttpService
      .addOpinion$({ companyId, comment, rating })
      .pipe(
        tap(res => {
          this._lazyLoader$.next(false);
          this._toastMessageService.showToast(res.response, ToastType.INFO);
          return res;
        }),
        catchError(err => {
          this._lazyLoader$.next(false);
          this._toastMessageService.showToast(
            Utils.getFirstObjectErrorValue(err.error),
            ToastType.DANGER
          );
          return throwError(() => new Error(err));
        })
      );
  }

  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
}
