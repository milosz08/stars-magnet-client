/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: categories-http.service.ts
 *   Created at: 2023-06-04, 12:40:10
 *   Last updated at: 2023-08-30, 22:43:42
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
