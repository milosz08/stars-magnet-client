/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, first, takeUntil } from 'rxjs';
import { LazyLoaderService } from './modules/commons/services/lazy-loader/lazy-loader.service';
import { LoggedStatusService } from './modules/commons/services/logged-status/logged-status.service';
import { AbstractComponentReactiveProvider } from './modules/commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-root',
  template: `
    <app-lazy-page-loader />
    <app-toast-message
      aria-live="polite"
      aria-atomic="true"
      class="forced-top" />
    <app-header />
    <div class="d-flex flex-column flex-fill header-top-margin container">
      <router-outlet />
    </div>
    <app-footer />
  `,
  host: { class: 'd-flex flex-column h-100' },
})
export class AppRootComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _lazyLoaderService: LazyLoaderService,
    private _loggedStatusService: LoggedStatusService
  ) {
    super();
  }

  ngOnInit(): void {
    this._lazyLoaderService.activateLazyLoader();
    this._loggedStatusService
      .refresh$()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }
}
