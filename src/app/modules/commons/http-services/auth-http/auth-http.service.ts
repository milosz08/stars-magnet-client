/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
