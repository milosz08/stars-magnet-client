/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: grade-stars.service.ts
 * Last modified: 6/7/23, 1:06 AM
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { GradeType, IGradeModel } from "../../models/grade.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class GradeStarsService {

    private _lockedAtPosition!: number | null;
    private _stars = Array.from({ length: 10 }).map((_, i): IGradeModel => ({ id: i + 1, mode: GradeType.HOLLOW }));

    private _stars$: BehaviorSubject<IGradeModel[]> = new BehaviorSubject<IGradeModel[]>(this._stars);
    private _currentSelectedStars$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _selectedStars$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    setLockedAtPosition(selectedStars: number): void {
        if (selectedStars < 1) return;
        this._lockedAtPosition = selectedStars;
        for (const star of this._stars) {
            if (star.id > this._lockedAtPosition) continue;
            star.mode = GradeType.FILL;
        }
        this._stars$.next(this._stars);
    };

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
    };

    handleHollowStarOnLeavePointer(): void {
        for (const star of this._stars) {
            if (!this._lockedAtPosition || star.id <= this._lockedAtPosition) continue;
            star.mode = GradeType.HOLLOW;
        }
        this._stars$.next(this._stars);
    };

    handleSelectStar(idx: number): void {
        if (this._lockedAtPosition === idx) {
            this._lockedAtPosition = null;
            this._stars.forEach(s => s.mode = GradeType.HOLLOW);
            this._selectedStars$.next(0);
        } else {
            this._lockedAtPosition = idx;
            this._stars.forEach(s => s.id > idx ?  s.mode = GradeType.HOLLOW : s.mode = GradeType.FILL);
            this._selectedStars$.next(idx);
            this._currentSelectedStars$.next(idx);
        }
    };

    handleClearAllStars(): void {
        if (this._lockedAtPosition) return;
        this.forcedClearAllStars();
    };

    forcedClearAllStars(): void {
        for (const star of this._stars) {
            star.mode = GradeType.HOLLOW;
        }
        this._currentSelectedStars$.next(0);
        if (this._lockedAtPosition) this._selectedStars$.next(0);
        this._lockedAtPosition = null;
        this._stars$.next(this._stars);
    };

    get stars$(): Observable<IGradeModel[]> { return this._stars$.asObservable(); };
    get currentSelectedStars$(): Observable<number> { return this._currentSelectedStars$.asObservable(); };
    get selectedStars$(): Observable<number> { return this._selectedStars$.asObservable(); };
}
