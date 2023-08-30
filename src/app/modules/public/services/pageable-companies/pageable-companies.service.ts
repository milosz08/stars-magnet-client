/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: pageable-companies.service.ts
 *   Created at: 2023-06-06, 19:59:34
 *   Last updated at: 2023-08-30, 22:14:25
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
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { CompanyResDtoModel } from '~/app-public/models/company.model';

@Injectable()
export class PageableCompaniesService {
  private _pageable$: BehaviorSubject<PrePageableData | null> =
    new BehaviorSubject<PrePageableData | null>(null);
  private _companies$: BehaviorSubject<CompanyResDtoModel[]> =
    new BehaviorSubject<CompanyResDtoModel[]>([]);

  private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(
    1
  );

  toggleLazyLoader(value: boolean): void {
    this._lazyLoader$.next(value);
  }

  setCurrentPage(page: number): void {
    this._currentPage$.next(page);
  }

  setCompanies(companies: CompanyResDtoModel[]): void {
    this._companies$.next(companies);
  }

  setPageable(pageableData: PrePageableData | null): void {
    if (!pageableData) return;
    this._pageable$.next(pageableData);
  }

  setTotalCount(totalCount: number): void {
    this._totalCount$.next(totalCount);
  }

  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
  get companies$(): Observable<CompanyResDtoModel[]> {
    return this._companies$.asObservable();
  }
  get totalCount$(): Observable<number> {
    return this._totalCount$.asObservable();
  }
  get pageable$(): Observable<PrePageableData | null> {
    return this._pageable$.asObservable();
  }
  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }
}
