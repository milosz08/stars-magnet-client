/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: grade-stars.component.ts
 * Last modified: 6/6/23, 11:49 PM
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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

import { Observable, takeUntil } from "rxjs";

import { GradeType, IGradeModel } from "../../models/grade.model";
import { AbstractComponentReactiveProvider } from "../../utils/abstract-component-reactive-provider";

import { GradeStarsService } from "../../services/grade-stars/grade-stars.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-grade-stars",
    templateUrl: "./grade-stars.component.html",
})
export class GradeStarsComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    @Input() selectedStars = 0;
    @Output() selectStarEmit: EventEmitter<number> = new EventEmitter<number>();
    @Output() currentSelectedStarsEmit: EventEmitter<number> = new EventEmitter<number>();

    stars$: Observable<IGradeModel[]> = this._gradeStarsService.stars$;

    hollowMode = GradeType.HOLLOW;
    fillMode = GradeType.FILL;

    constructor(
        private _gradeStarsService: GradeStarsService,
    ) {
        super();
        this._gradeStarsService.currentSelectedStars$.pipe(takeUntil(this._unsubscribe))
            .subscribe(d => this.currentSelectedStarsEmit.emit(d));
        this._gradeStarsService.selectedStars$.pipe(takeUntil(this._unsubscribe))
            .subscribe(d => this.selectStarEmit.emit(d));
    };

    ngOnInit(): void {
        this._gradeStarsService.setLockedAtPosition(this.selectedStars);
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    handleClearAllStars(): void {
        this._gradeStarsService.handleClearAllStars();
    };

    handleSelectStar(starIdx: number): void {
        this._gradeStarsService.handleSelectStar(starIdx);
    };

    handleFillStarOnEntryPointer(starIdx: number): void {
        this._gradeStarsService.handleFillStarOnEntryPointer(starIdx);
    };

    handleHollowStarOnLeavePointer(): void {
        this._gradeStarsService.handleHollowStarOnLeavePointer();
    };
}
