/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CategoriesHttpService } from '~/app-commons/http-services/categories-http/categories-http.service';
import { CompanyHttpService } from '~/app-commons/http-services/company-http/company-http.service';
import {
  AddCompanyFormModel,
  AddCompanyReqDto,
  PassCompanyResDto,
} from '~/app-commons/models/company.model';
import { MultiselectItemModel } from '~/app-commons/models/multiselect-input.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { LazyLoaderService } from '~/app-commons/services/lazy-loader/lazy-loader.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AlertType } from '~/app-commons/utils/alert.type';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyCredentialsService } from '../company-credentials/company-credentials.service';

@Injectable()
export class AddCompanyService {
  private _suspenseSpinner$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _responseAlert$: BehaviorSubject<ResponseAlertModel> =
    new BehaviorSubject<ResponseAlertModel>({
      type: AlertType.ERROR,
      content: '',
    });

  constructor(
    private readonly _router: Router,
    private readonly _lazyLoaderService: LazyLoaderService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _addCompanyHttpService: CompanyHttpService,
    private readonly _categoriesHttpService: CategoriesHttpService,
    private readonly _addedCompanyCredentialsService: CompanyCredentialsService
  ) {}

  addCompany$(formReq: AddCompanyFormModel): Observable<PassCompanyResDto> {
    this._suspenseSpinner$.next(true);
    const reqData: AddCompanyReqDto = Utils.convertCamelToSnake(formReq);
    reqData.categories = formReq.categories;
    return this._addCompanyHttpService.addCompany$(reqData).pipe(
      tap(res => {
        this._addedCompanyCredentialsService.assignCredentials(res);
        this._suspenseSpinner$.next(false);
        this._router.navigate(['/auth/company-credentials']).then(r => r);
      }),
      catchError(err => {
        this._suspenseSpinner$.next(false);
        const resMessage = Utils.getFirstObjectErrorValue(err.error);
        this._responseAlert$.next({
          type: AlertType.ERROR,
          content: `${resMessage || 'Unknow server error'}.`,
        });
        return throwError(() => new Error(err));
      })
    );
  }

  getAllCategories$(): Observable<MultiselectItemModel[]> {
    this._lazyLoaderService.forcedActivateLoader();
    return this._categoriesHttpService.getAllCategories$().pipe(
      tap(res => {
        this._lazyLoaderService.forcedInactivateLoader();
        return res;
      }),
      catchError(err => {
        this._router.navigate(['/']).then(() => {
          this._lazyLoaderService.forcedInactivateLoader();
          this._toastMessageService.showToast(
            Utils.getGenericErr(err),
            ToastType.DANGER
          );
        });
        return throwError(() => new Error(err));
      })
    );
  }

  get suspenseSpinner$(): Observable<boolean> {
    return this._suspenseSpinner$.asObservable();
  }
  get responseAlert$(): Observable<ResponseAlertModel> {
    return this._responseAlert$.asObservable();
  }
}
