/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: grade-stars.service.ts
 *   Created at: 2023-06-07, 01:06:23
 *   Last updated at: 2023-08-30, 22:52:00
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
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GradeType, IGradeModel } from '~/app-commons/models/grade.model';

@Injectable()
export class GradeStarsService {
  private _lockedAtPosition!: number | null;
  private _stars = Array.from({ length: 10 }).map(
    (_, i): IGradeModel => ({ id: i + 1, mode: GradeType.HOLLOW })
  );

  private _stars$: BehaviorSubject<IGradeModel[]> = new BehaviorSubject<
    IGradeModel[]
  >(this._stars);

  private _currentSelectedStars$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  private _selectedStars$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  setLockedAtPosition(selectedStars: number): void {
    if (selectedStars < 1) return;
    this._lockedAtPosition = selectedStars;
    for (const star of this._stars) {
      if (star.id > this._lockedAtPosition) continue;
      star.mode = GradeType.FILL;
    }
    this._stars$.next(this._stars);
  }

  handleFillStarOnEntryPointer(idx: number): void {
    for (const star of this._stars) {
      if (this._lockedAtPosition && star.id <= this._lockedAtPosition) {
        star.mode = GradeType.FILL;
        continue;
      }
      if (star.id > idx) {
        star.mode = GradeType.HOLLOW;
      } else {
        star.mode = GradeType.FILL;
        this._currentSelectedStars$.next(idx);
      }
    }
    this._stars$.next(this._stars);
  }

  handleHollowStarOnLeavePointer(): void {
    for (const star of this._stars) {
      if (!this._lockedAtPosition || star.id <= this._lockedAtPosition)
        continue;
      star.mode = GradeType.HOLLOW;
    }
    this._stars$.next(this._stars);
  }

  handleSelectStar(idx: number): void {
    if (this._lockedAtPosition === idx) {
      this._lockedAtPosition = null;
      this._stars.forEach(s => (s.mode = GradeType.HOLLOW));
      this._selectedStars$.next(0);
    } else {
      this._lockedAtPosition = idx;
      this._stars.forEach(s =>
        s.id > idx ? (s.mode = GradeType.HOLLOW) : (s.mode = GradeType.FILL)
      );
      this._selectedStars$.next(idx);
      this._currentSelectedStars$.next(idx);
    }
  }

  handleClearAllStars(): void {
    if (this._lockedAtPosition) return;
    this.forcedClearAllStars();
  }

  forcedClearAllStars(): void {
    for (const star of this._stars) {
      star.mode = GradeType.HOLLOW;
    }
    this._currentSelectedStars$.next(0);
    if (this._lockedAtPosition) this._selectedStars$.next(0);
    this._lockedAtPosition = null;
    this._stars$.next(this._stars);
  }

  get stars$(): Observable<IGradeModel[]> {
    return this._stars$.asObservable();
  }
  get currentSelectedStars$(): Observable<number> {
    return this._currentSelectedStars$.asObservable();
  }
  get selectedStars$(): Observable<number> {
    return this._selectedStars$.asObservable();
  }
}
