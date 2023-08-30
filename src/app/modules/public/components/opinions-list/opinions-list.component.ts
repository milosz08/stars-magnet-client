/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: opinions-list.component.ts
 *   Created at: 2023-06-09, 21:29:26
 *   Last updated at: 2023-08-30, 22:28:19
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
import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { OpinionResDtoModel } from '~/app-commons/models/opinion.model';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { Utils } from '~/app-commons/utils/utils';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';

@Component({
  selector: 'app-opinins-list',
  templateUrl: './opinions-list.component.html',
})
export class OpinionsListComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  @Input() companyId!: number;

  lazyLoader$: Observable<boolean> = this._companyOpinionsService.lazyLoader$;
  opinions$: Observable<OpinionResDtoModel[]> =
    this._companyOpinionsService.opinions$;
  currentPage$: Observable<number> = this._companyOpinionsService.currentPage$;
  pageable$: Observable<PrePageableData | null> =
    this._companyOpinionsService.pageable$;

  constructor(private readonly _companyOpinionsService: CompanyOpinionService) {
    super();
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onChangePage(page: number): void {
    this._companyOpinionsService
      .moveToPage$(page)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }

  refreshOpinions(): void {
    this._companyOpinionsService
      .refreshPageable$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
    this._companyOpinionsService
      .loadOpinions$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }

  refrehOpinionsWithoutPagination(): void {
    this._companyOpinionsService
      .loadOpinions$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe();
  }

  generateStarsStructure(avgRating: number | string): string[] {
    return Utils.generateStarsStructure(String(avgRating));
  }
}
