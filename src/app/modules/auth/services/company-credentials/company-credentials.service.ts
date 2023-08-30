/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-credentials.service.ts
 *   Created at: 2023-06-04, 14:56:24
 *   Last updated at: 2023-08-30, 23:07:48
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
