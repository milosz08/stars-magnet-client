/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: opinions-http.service.ts
 *   Created at: 2023-06-09, 21:48:55
 *   Last updated at: 2023-08-30, 22:45:43
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
import {
  AddOpinionReqDtoModel,
  AddOpinionResDtoModel,
  AddResponseOpinionReqDtoModel,
  OpinionsPageableResDtoModel,
} from '~/app-commons/models/opinion.model';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { environment } from '~/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class OpinionsHttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  addOpinion$(
    reqDto: AddOpinionReqDtoModel
  ): Observable<AddOpinionResDtoModel> {
    return this._httpClient.post<AddOpinionResDtoModel>(
      `${environment.httpBackendURI}/api/opinion`,
      reqDto
    );
  }

  reponseToOpinion$(
    reqDto: AddResponseOpinionReqDtoModel
  ): Observable<AddOpinionResDtoModel> {
    return this._httpClient.post<AddOpinionResDtoModel>(
      `${environment.httpBackendURI}/api/opinion/company`,
      reqDto
    );
  }

  getAllOpinionsPageable$(
    companyId: number,
    fixedLimit: number
  ): Observable<PrePageableData> {
    const params = new HttpParams().set('fixedLimit', fixedLimit);
    return this._httpClient.get<PrePageableData>(
      `${environment.httpBackendURI}/api/opinion/list/company/${companyId}/pageable`,
      { params }
    );
  }

  getAllOpinions$(
    companyId: number,
    fixedLimit: number,
    offset: number
  ): Observable<OpinionsPageableResDtoModel> {
    const params = new HttpParams()
      .set('limit', fixedLimit)
      .set('offset', offset);
    return this._httpClient.get<OpinionsPageableResDtoModel>(
      `${environment.httpBackendURI}/api/opinion/list/company/${companyId}`,
      { params }
    );
  }
}
