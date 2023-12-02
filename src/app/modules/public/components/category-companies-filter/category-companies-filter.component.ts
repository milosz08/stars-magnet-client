/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  CompanyFilterModel,
  DEF_FILTER,
} from '~/app-commons/models/company-filter.model';
import { GradeStarsService } from '~/app-commons/services/grade-stars/grade-stars.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { CompanyFilterService } from '~/app-public/services/company-filter/company-filter.service';

@Component({
  selector: 'app-category-companies-filter',
  templateUrl: './category-companies-filter.component.html',
  providers: [GradeStarsService],
})
export class CategoryCompaniesFilterComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  filter!: CompanyFilterModel;
  selectedStars = 0;

  @Output() refrehDataEmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly _gradeStarsService: GradeStarsService,
    private readonly _companyFilterService: CompanyFilterService
  ) {
    super();
  }

  ngOnInit(): void {
    this._companyFilterService.filter$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(f => (this.filter = { ...f }));
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  handleChangeStar(selectedIdx: number): void {
    this.filter.avgGrade = selectedIdx;
  }

  handleCurrentSelectedStars(selectedNumber: number): void {
    this.selectedStars = selectedNumber;
  }

  handleFilterCompanies(): void {
    this._companyFilterService.setFilter(this.filter);
    this.refrehDataEmit.emit();
  }

  handleClearFilters(): void {
    this.selectedStars = 0;
    this._gradeStarsService.forcedClearAllStars();
    this._companyFilterService.setFilter(DEF_FILTER);
    this.refrehDataEmit.emit();
  }
}
