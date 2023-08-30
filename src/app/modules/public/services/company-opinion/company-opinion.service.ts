/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-opinion.service.ts
 *   Created at: 2023-06-09, 17:24:11
 *   Last updated at: 2023-08-30, 22:13:41
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
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { OpinionsHttpService } from '~/app-commons/http-services/opinions-http/opinions-http.service';
import { OpinionResDtoModel } from '~/app-commons/models/opinion.model';
import {
  PageableLimitsUnion,
  PrePageableData,
  pageableLimits,
} from '~/app-commons/models/pagination.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { LazyLoaderService } from '~/app-commons/services/lazy-loader/lazy-loader.service';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { PageableLimitService } from '~/app-commons/services/pageable-limit/pageable-limit.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { Utils } from '~/app-commons/utils/utils';

@Injectable()
export class CompanyOpinionService
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  private _pageable$: BehaviorSubject<PrePageableData | null> =
    new BehaviorSubject<PrePageableData | null>(null);
  private _opinions$: BehaviorSubject<OpinionResDtoModel[]> =
    new BehaviorSubject<OpinionResDtoModel[]>([]);
  private _alreadyAdded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(
    1
  );

  private _userId!: number;
  private _allPages = 0;
  private _currentPage = 1;
  private _companyId!: number;
  private _pageableLimit: PageableLimitsUnion = pageableLimits[0];

  constructor(
    private readonly _router: Router,
    private readonly _lazyLoaderService: LazyLoaderService,
    private readonly _toastMessageService: ToastMessageService,
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _opinionsHttpService: OpinionsHttpService,
    private readonly _pageableLimitService: PageableLimitService
  ) {
    super();
    this._pageableLimitService.pageableLimit$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(l => (this._pageableLimit = l));
    this._loggedStatusService.loggedDetails$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(d => {
        if (d) this._userId = d.id;
      });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  loadPageable$(companyId: number): Observable<PrePageableData> {
    this._lazyLoaderService.forcedActivateLoader();
    this._companyId = companyId;
    return this._opinionsHttpService
      .getAllOpinionsPageable$(companyId, this._pageableLimit)
      .pipe(
        tap(res => {
          this.updateCountOfPages(res);
          this._lazyLoaderService.forcedInactivateLoader();
        }),
        catchError(err => this.onThrowError$(err))
      );
  }

  refreshPageable$(): Observable<PrePageableData> {
    this._lazyLoader$.next(true);
    this._currentPage = 1;
    this._currentPage$.next(1);
    return this._opinionsHttpService
      .getAllOpinionsPageable$(this._companyId, this._pageableLimit)
      .pipe(
        tap(res => this.updateCountOfPages(res)),
        catchError(err => this.onThrowError$(err))
      );
  }

  loadOpinions$(): Observable<OpinionResDtoModel[]> {
    this._lazyLoader$.next(true);
    const offset = (this._currentPage - 1) * this._pageableLimit;
    return this._opinionsHttpService
      .getAllOpinions$(this._companyId, this._pageableLimit, offset)
      .pipe(
        tap(res => {
          res.results = res.results
            .map(r => {
              r.commentDate = new Date(r.commentDate);
              return r;
            })
            .sort((x, y) => y.commentDate.getTime() - x.commentDate.getTime()); // desc sorting
          this._opinions$.next(res.results);
          this.checkIfUserAlreadyAddedOpinion(res.results.map(r => r.userId));
          this._lazyLoader$.next(false);
        }),
        catchError(err => this.onThrowError$(err))
      );
  }

  checkIfUserAlreadyAddedOpinion(userIds: number[]): void {
    this._alreadyAdded$.next(userIds.includes(this._userId));
  }

  moveToPage$(pageNumber: number): Observable<OpinionResDtoModel[] | null> {
    if (pageNumber < 1 || pageNumber > this._allPages) {
      return of(null);
    }
    this._currentPage = pageNumber;
    this._currentPage$.next(pageNumber);
    return this.loadOpinions$();
  }

  private onThrowError$(err: any): Observable<any> {
    this._router.navigate(['/companies']).then(r => r);
    this._toastMessageService.showToast(
      Utils.getGenericErr(err),
      ToastType.DANGER
    );
    return throwError(err);
  }

  private updateCountOfPages(res: PrePageableData): void {
    this._pageable$.next(res);
    this._allPages = res.countAllPages;
  }

  get pageable$(): Observable<PrePageableData | null> {
    return this._pageable$.asObservable();
  }
  get opinions$(): Observable<OpinionResDtoModel[]> {
    return this._opinions$.asObservable();
  }
  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }
  get alreadyAdded$(): Observable<boolean> {
    return this._alreadyAdded$.asObservable();
  }
}
