/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: grade-stars.component.ts
 *   Created at: 2023-06-06, 23:49:30
 *   Last updated at: 2023-08-30, 22:38:18
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
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { GradeType, IGradeModel } from '~/app-commons/models/grade.model';
import { GradeStarsService } from '~/app-commons/services/grade-stars/grade-stars.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-grade-stars',
  templateUrl: './grade-stars.component.html',
  styleUrls: ['./grade-stars.component.scss'],
})
export class GradeStarsComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() selectedStars = 0;
  @Output() selectStarEmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentSelectedStarsEmit: EventEmitter<number> =
    new EventEmitter<number>();

  stars$: Observable<IGradeModel[]> = this._gradeStarsService.stars$;

  hollowMode = GradeType.HOLLOW;
  fillMode = GradeType.FILL;

  constructor(private readonly _gradeStarsService: GradeStarsService) {
    super();
    this._gradeStarsService.currentSelectedStars$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(d => this.currentSelectedStarsEmit.emit(d));
    this._gradeStarsService.selectedStars$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(d => this.selectStarEmit.emit(d));
  }

  ngOnInit(): void {
    this._gradeStarsService.setLockedAtPosition(this.selectedStars);
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  handleClearAllStars(): void {
    this._gradeStarsService.handleClearAllStars();
  }

  handleSelectStar(starIdx: number): void {
    this._gradeStarsService.handleSelectStar(starIdx);
  }

  handleFillStarOnEntryPointer(starIdx: number): void {
    this._gradeStarsService.handleFillStarOnEntryPointer(starIdx);
  }

  handleHollowStarOnLeavePointer(): void {
    this._gradeStarsService.handleHollowStarOnLeavePointer();
  }
}
