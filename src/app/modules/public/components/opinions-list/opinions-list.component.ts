/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: opinions-list.component.ts
 * Last modified: 6/9/23, 9:32 PM
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

import { Component, Input, OnDestroy } from "@angular/core";

import { Observable, takeUntil } from "rxjs";

import { Utils } from "../../../commons/utils/utils";
import { IOpinionResDtoModel } from "../../../commons/models/opinion.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";

import { CompanyOpinionService } from "../../services/company-opinion/company-opinion.service";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-opinins-list",
    templateUrl: "./opinions-list.component.html",
})
export class OpinionsListComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    @Input() companyId!: number;

    lazyLoader$: Observable<boolean> = this._companyOpinionsService.lazyLoader$;
    opinions$: Observable<IOpinionResDtoModel[]> = this._companyOpinionsService.opinions$;
    currentPage$: Observable<number> = this._companyOpinionsService.currentPage$;
    pageable$: Observable<IPrePageableData | null> = this._companyOpinionsService.pageable$;

    constructor(
        private _companyOpinionsService: CompanyOpinionService,
    ) {
        super();
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onChangePage(page: number): void {
        this._companyOpinionsService.moveToPage$(page).pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    refreshOpinions(): void {
        this._companyOpinionsService.refreshPageable$().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._companyOpinionsService.loadOpinions$().pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    refrehOpinionsWithoutPagination(): void {
        this._companyOpinionsService.loadOpinions$().pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    generateStarsStructure(avgRating: number | string): string[] {
        return Utils.generateStarsStructure(String(avgRating));
    };
}
