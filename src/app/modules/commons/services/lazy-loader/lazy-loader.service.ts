/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
