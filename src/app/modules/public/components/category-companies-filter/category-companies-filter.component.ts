/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: category-companies-filter.component.ts
 * Last modified: 6/5/23, 12:03 AM
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

import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";

import { takeUntil } from "rxjs";

import { DEF_FILTER, ICompanyFilterModel } from "../../../commons/models/company-filter.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { CompanyFilterService } from "../../services/company-filter/company-filter.service";
import { GradeStarsService } from "../../../commons/services/grade-stars/grade-stars.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-category-companies-filter",
    templateUrl: "./category-companies-filter.component.html",
    providers: [ GradeStarsService ],
})
export class CategoryCompaniesFilterComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    filter!: ICompanyFilterModel;
    selectedStars = 0;

    @Output() refrehDataEmit: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _gradeStarsService: GradeStarsService,
        private _companyFilterService: CompanyFilterService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._companyFilterService.filter$.pipe(takeUntil(this._unsubscribe)).subscribe(f => this.filter = { ...f });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    handleChangeStar(selectedIdx: number): void {
        this.filter.avgGrade = selectedIdx;
    };

    handleCurrentSelectedStars(selectedNumber: number): void {
        this.selectedStars = selectedNumber;
    };

    handleFilterCompanies(): void {
        this._companyFilterService.setFilter(this.filter);
        this.refrehDataEmit.emit();
    };

    handleClearFilters(): void {
        this.selectedStars = 0;
        this._gradeStarsService.forcedClearAllStars();
        this._companyFilterService.setFilter(DEF_FILTER);
        this.refrehDataEmit.emit();
    };
}
