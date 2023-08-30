/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: search-company-box.service.ts
 *   Created at: 2023-06-06, 18:25:51
 *   Last updated at: 2023-08-30, 22:17:14
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
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchCompanyBoxService {
  private _searchContent$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  pushNewParaphrase(paraphrase: string): void {
    this._searchContent$.next(paraphrase);
  }

  getDebouncedSearchResult$(unsubscribe: Subject<void>): Observable<any> {
    return this._searchContent$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(unsubscribe)
    );
  }

  get searchContent$(): Observable<string> {
    return this._searchContent$.asObservable();
  }
}
