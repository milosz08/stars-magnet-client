/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MultiselectItemModel } from '~/app-commons/models/multiselect-input.model';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { PageableCategories } from '~/app-public/models/category.model';
import { environment } from '~/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesHttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  getPageableData$(fixedLimit: number): Observable<PrePageableData> {
    return this._httpClient.get<PrePageableData>(
      `${environment.httpBackendURI}/api/category/pageable/${fixedLimit}`
    );
  }

  getCategories$(
    fixedLimit: number,
    offset: number
  ): Observable<PageableCategories> {
    const params = new HttpParams()
      .set('limit', fixedLimit)
      .set('offset', offset);
    return this._httpClient.get<PageableCategories>(
      `${environment.httpBackendURI}/api/category`,
      { params }
    );
  }

  getAllCategories$(): Observable<MultiselectItemModel[]> {
    return this._httpClient.get<MultiselectItemModel[]>(
      `${environment.httpBackendURI}/api/category/all`
    );
  }
}
