/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
