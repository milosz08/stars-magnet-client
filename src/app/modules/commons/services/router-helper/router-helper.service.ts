/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
