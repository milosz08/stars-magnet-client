/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PassCompanyResDto } from '~/app-commons/models/company.model';

@Injectable()
export class CompanyCredentialsService {
  private _companyCredentials$: Subject<PassCompanyResDto | null> =
    new BehaviorSubject<PassCompanyResDto | null>(null);

  assignCredentials(resDto: PassCompanyResDto): void {
    this._companyCredentials$.next(resDto);
  }

  resetCredentials(): void {
    this._companyCredentials$.next(null);
  }

  get companyCredentials$(): Observable<PassCompanyResDto | null> {
    return this._companyCredentials$.asObservable();
  }
}
