/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
