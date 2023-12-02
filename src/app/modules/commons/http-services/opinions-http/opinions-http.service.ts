/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
