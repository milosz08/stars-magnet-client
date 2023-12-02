/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  PageableLimitsUnion,
  pageableLimits,
} from '~/app-commons/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PageableLimitService {
  private _pageableLimit$: BehaviorSubject<PageableLimitsUnion> =
    new BehaviorSubject<PageableLimitsUnion>(pageableLimits[0]);

  setPageableLimit(limit: PageableLimitsUnion): void {
    this._pageableLimit$.next(limit);
  }

  get pageableLimit$(): Observable<PageableLimitsUnion> {
    return this._pageableLimit$.asObservable();
  }
}
