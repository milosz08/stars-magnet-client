/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-filter.service.ts
 *   Created at: 2023-06-07, 17:19:45
 *   Last updated at: 2023-08-30, 22:13:20
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
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyFilterModel } from '~/app-commons/models/company-filter.model';

@Injectable({ providedIn: 'root' })
export class CompanyFilterService {
  private _filter$: BehaviorSubject<CompanyFilterModel> =
    new BehaviorSubject<CompanyFilterModel>({
      avgGrade: 0,
      hasGrades: false,
      sortBy: 'alphabetically',
      sortDir: 'ASC',
    });

  setFilter(filterData: CompanyFilterModel): void {
    this._filter$.next(filterData);
  }

  get filter$(): Observable<CompanyFilterModel> {
    return this._filter$.asObservable();
  }
}
