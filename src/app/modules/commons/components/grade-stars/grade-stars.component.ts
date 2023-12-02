/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
