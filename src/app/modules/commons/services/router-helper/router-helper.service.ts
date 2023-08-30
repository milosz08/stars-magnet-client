/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: router-helper.service.ts
 *   Created at: 2023-06-05, 05:31:25
 *   Last updated at: 2023-08-30, 22:54:55
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
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { LazyLoaderService } from '../lazy-loader/lazy-loader.service';

@Injectable()
export class RouterHelperService
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _lazyLoaderService: LazyLoaderService
  ) {
    super();
  }

  checkAndExtractParamId(
    id: string,
    returnTo: string,
    callback: (categoryId: number) => void
  ): void {
    this._lazyLoaderService.forcedActivateLoader();
    this._route.paramMap
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params: any) => {
        const categoryId = params.get(id);
        if (!categoryId) {
          this._router.navigate([returnTo]).then(r => r);
          return;
        }
        callback(categoryId);
      });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }
}
