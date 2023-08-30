/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: app-root.component.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 22:07:51
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
