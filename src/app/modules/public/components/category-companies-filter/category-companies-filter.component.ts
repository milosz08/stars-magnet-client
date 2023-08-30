/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: category-companies-filter.component.ts
 *   Created at: 2023-06-05, 00:03:38
 *   Last updated at: 2023-08-30, 22:22:45
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
