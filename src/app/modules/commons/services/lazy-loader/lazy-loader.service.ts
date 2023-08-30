/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: lazy-loader.service.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:53:00
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
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LazyLoaderService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private readonly _router: Router) {}

  activateLazyLoader(): void {
    this._router.events.subscribe(e => {
      if (e instanceof RouteConfigLoadStart) {
        this._isLoading$.next(true);
      } else if (e instanceof RouteConfigLoadEnd) {
        setTimeout(() => this._isLoading$.next(false), 1000);
      }
    });
  }

  forcedActivateLoader(): void {
    this._isLoading$.next(true);
  }

  forcedInactivateLoader(): void {
    this._isLoading$.next(false);
  }

  get isLoading$(): BehaviorSubject<boolean> {
    return this._isLoading$;
  }
}
