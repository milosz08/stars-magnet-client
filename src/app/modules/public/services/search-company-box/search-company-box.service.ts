/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
