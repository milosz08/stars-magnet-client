/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: category-companies-list.component.ts
 * Last modified: 6/5/23, 12:04 AM
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

import { ICompanyResDtoModel } from "../../models/company.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";
import { IResponseAlertModel } from "../../../commons/models/response-alert.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { CompaniesCategoryService } from "../../services/companies-category/companies-category.service";
import { PageableLimitService } from "../../../commons/services/pageable-limit/pageable-limit.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-category-companies-list",
    templateUrl: "./category-companies-list.component.html",
    styleUrls: [ "./category-companies-list.component.scss" ],
})
export class CategoryCompaniesListComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    lazyLoader$: Observable<boolean> = this._companiesCategoryService.lazyLoader$;
    alertErrors$: Observable<IResponseAlertModel> = this._companiesCategoryService.alertError$;
    companies$: Observable<ICompanyResDtoModel[]> = this._companiesCategoryService.companies$;
    totalCount$: Observable<number> = this._companiesCategoryService.totalCount$;

    currentPage$: Observable<number> = this._companiesCategoryService.currentPage$;
    pageable$: Observable<IPrePageableData | null> = this._companiesCategoryService.pageable$;

    @Input() categoryName = "";

    constructor(
        private _pageableLimitService: PageableLimitService,
        private _companiesCategoryService: CompaniesCategoryService,
    ) {
        super();
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onChangePage(page: number): void {
        this._companiesCategoryService.moveToPage(page).pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    onChangeLimit(): void {
        this._companiesCategoryService.refreshPageable().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._companiesCategoryService.loadCompaniesByCategory().pipe(takeUntil(this._unsubscribe)).subscribe();
    };
}
