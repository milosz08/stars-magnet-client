/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: pageable-limit.service.ts
 *   Created at: 2023-06-05, 04:34:13
 *   Last updated at: 2023-08-30, 22:54:38
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
