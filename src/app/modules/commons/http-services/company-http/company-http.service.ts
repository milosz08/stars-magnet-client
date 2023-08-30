/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-http.service.ts
 *   Created at: 2023-06-04, 13:37:52
 *   Last updated at: 2023-08-30, 22:44:42
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
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyFilterModel } from '~/app-commons/models/company-filter.model';
import {
  AddCompanyReqDto,
  PassCompanyResDto,
} from '~/app-commons/models/company.model';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import {
  CompanyResDtoModel,
  CompanysPageableResDtoModel,
} from '~/app-public/models/company.model';
import { environment } from '~/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyHttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  addCompany$(reqDto: AddCompanyReqDto): Observable<PassCompanyResDto> {
    return this._httpClient.post<PassCompanyResDto>(
      `${environment.httpBackendURI}/api/company`,
      reqDto
    );
  }

  getPageableData$(
    categoryId: number,
    fixedLimit: number,
    filter: CompanyFilterModel
  ): Observable<PrePageableData> {
    const params = new HttpParams()
      .set('category', categoryId)
      .set('fixedLimit', fixedLimit);
    return this._httpClient.post<PrePageableData>(
      `${environment.httpBackendURI}/api/category/company/pageable`,
      filter,
      { params }
    );
  }

  getPageableAllData$(
    query: string,
    fixedLimit: number,
    filter: CompanyFilterModel
  ): Observable<PrePageableData> {
    const params = new HttpParams()
      .set('query', query)
      .set('fixedLimit', fixedLimit);
    return this._httpClient.post<PrePageableData>(
      `${environment.httpBackendURI}/api/company/pageable`,
      filter,
      { params }
    );
  }

  getAllCompaniesByCategory$(
    categoryId: number,
    fixedLimit: number,
    offset: number,
    filter: CompanyFilterModel
  ): Observable<CompanysPageableResDtoModel> {
    const params = new HttpParams()
      .set('limit', fixedLimit)
      .set('offset', offset)
      .set('category', categoryId);
    return this._httpClient.post<CompanysPageableResDtoModel>(
      `${environment.httpBackendURI}/api/category/company`,
      filter,
      { params }
    );
  }

  getAllCompaniesByQuery$(
    query: string,
    fixedLimit: number,
    offset: number,
    filter: CompanyFilterModel
  ): Observable<CompanysPageableResDtoModel> {
    const params = new HttpParams()
      .set('limit', fixedLimit)
      .set('offset', offset)
      .set('query', query);
    return this._httpClient.post<CompanysPageableResDtoModel>(
      `${environment.httpBackendURI}/api/search`,
      filter,
      { params }
    );
  }

  getSingleCompany$(companyId: number): Observable<CompanyResDtoModel> {
    return this._httpClient.get<CompanyResDtoModel>(
      `${environment.httpBackendURI}/api/company/${companyId}`
    );
  }
}
