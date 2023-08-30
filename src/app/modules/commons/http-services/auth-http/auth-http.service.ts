/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-http.service.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:42:20
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PassCompanyResDto,
  ResetTokenReqDto,
} from '~/app-commons/models/company.model';
import {
  AutoLoginResponseDto,
  CompanyLoginFormModel,
  LoginFormModel,
  LoginResponseDto,
} from '~/app-commons/models/login.model';
import {
  RefreshModelReqDto,
  RefreshModelResDto,
} from '~/app-commons/models/refresh.model';
import { RegisterReqDto } from '~/app-commons/models/register.model';
import { environment } from '~/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  login$(reqDto: LoginFormModel): Observable<LoginResponseDto> {
    return this._httpClient.post<LoginResponseDto>(
      `${environment.httpBackendURI}/api/login`,
      reqDto
    );
  }

  companyLogin$(reqDto: CompanyLoginFormModel): Observable<LoginResponseDto> {
    return this._httpClient.post<LoginResponseDto>(
      `${environment.httpBackendURI}/api/company/login`,
      reqDto
    );
  }

  companyResetToken$(reqDto: ResetTokenReqDto): Observable<PassCompanyResDto> {
    return this._httpClient.post<PassCompanyResDto>(
      `${environment.httpBackendURI}/api/token/reset`,
      reqDto
    );
  }

  register$(reqDto: RegisterReqDto): Observable<any> {
    return this._httpClient.post<any>(
      `${environment.httpBackendURI}/api/register`,
      reqDto
    );
  }

  refresh$(reqDto: RefreshModelReqDto): Observable<RefreshModelResDto> {
    return this._httpClient.post<RefreshModelResDto>(
      `${environment.httpBackendURI}/api/token/refresh`,
      reqDto
    );
  }

  autoLogin$(reqDto: RefreshModelReqDto): Observable<AutoLoginResponseDto> {
    return this._httpClient.post<AutoLoginResponseDto>(
      `${environment.httpBackendURI}/api/login/auto`,
      reqDto
    );
  }
}
