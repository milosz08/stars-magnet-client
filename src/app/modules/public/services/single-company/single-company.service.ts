/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: single-company.service.ts
 *   Created at: 2023-06-09, 17:23:17
 *   Last updated at: 2023-08-30, 22:17:31
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
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { CompanyHttpService } from '~/app-commons/http-services/company-http/company-http.service';
import { ToastType } from '~/app-commons/models/toast.model';
import { LazyLoaderService } from '~/app-commons/services/lazy-loader/lazy-loader.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyResDtoModel } from '~/app-public/models/company.model';

@Injectable()
export class SingleCompanyService {
  private _companyDetails$: BehaviorSubject<CompanyResDtoModel | null> =
    new BehaviorSubject<CompanyResDtoModel | null>(null);
  private _starsStructure$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private readonly _router: Router,
    private readonly _lazyLoaderService: LazyLoaderService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _companyHttpService: CompanyHttpService
  ) {}

  loadCompanyDetails$(companyId: number): Observable<CompanyResDtoModel> {
    this._lazyLoaderService.forcedActivateLoader();
    return this._companyHttpService.getSingleCompany$(companyId).pipe(
      map(res => {
        const parsedRes = this.parseCompanyDetails(res);
        this._companyDetails$.next(res);
        this._starsStructure$.next(
          Utils.generateStarsStructure(String(parsedRes.avgRatings))
        );
        this._lazyLoaderService.forcedInactivateLoader();
        return res;
      }),
      catchError(err => this.onCatchError(err))
    );
  }

  refreshCompanyDetails$(companyId: number): Observable<any> {
    this._lazyLoader$.next(true);
    return this._companyHttpService.getSingleCompany$(companyId).pipe(
      tap(res => {
        const parsedRes = this.parseCompanyDetails(res);
        this._companyDetails$.next(res);
        this._starsStructure$.next(
          Utils.generateStarsStructure(String(parsedRes.avgRatings))
        );
        this._lazyLoader$.next(false);
      }),
      catchError(err => this.onCatchError(err))
    );
  }

  private parseCompanyDetails(res: CompanyResDtoModel): CompanyResDtoModel {
    const avgRatings = String(res.avgRatings);
    res.avgRatings = avgRatings.replaceAll('.', ',');
    if (/^\d+$/.test(avgRatings)) {
      res.avgRatings += ',0';
    }
    return res;
  }

  private onCatchError(err: any): Observable<any> {
    this._lazyLoader$.next(false);
    this._router.navigate(['/companies']).then(() => {
      this._lazyLoaderService.forcedInactivateLoader();
      this._toastMessageService.showToast(
        Utils.getGenericErr(err),
        ToastType.DANGER
      );
    });
    return throwError(() => new Error(err));
  }

  get companyDetails$(): Observable<CompanyResDtoModel | null> {
    return this._companyDetails$.asObservable();
  }
  get starsStructure$(): Observable<string[]> {
    return this._starsStructure$.asObservable();
  }
  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
}
