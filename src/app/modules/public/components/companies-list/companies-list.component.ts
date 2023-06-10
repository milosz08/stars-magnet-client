/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: companies-list.component.ts
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

import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Observable } from "rxjs";

import { ICategoryModel } from "../../models/category.model";
import { ICompanyResDtoModel } from "../../models/company.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";

import { RouterHelperService } from "../../../commons/services/router-helper/router-helper.service";
import { PageableLimitService } from "../../../commons/services/pageable-limit/pageable-limit.service";
import { PageableCompaniesService } from "../../services/pageable-companies/pageable-companies.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-companies-list",
    templateUrl: "./companies-list.component.html",
    styleUrls: [ "./companies-list.component.scss" ],
    providers: [ RouterHelperService ],
})
export class CompaniesListComponent {

    @Input() categoryName = "";
    @Input() categoriesAreFullVisibled = false;

    @Output() onChangePageEmitter: EventEmitter<number> = new EventEmitter<number>();
    @Output() onChangeLimit: EventEmitter<void> = new EventEmitter<void>();

    lazyLoader$: Observable<boolean> = this._pageableCompanyService.lazyLoader$;
    companies$: Observable<ICompanyResDtoModel[]> = this._pageableCompanyService.companies$;
    currentPage$: Observable<number> = this._pageableCompanyService.currentPage$;
    pageable$: Observable<IPrePageableData | null> = this._pageableCompanyService.pageable$;

    constructor(
        private _routerHelperService: RouterHelperService,
        private _pageableLimitService: PageableLimitService,
        private _pageableCompanyService: PageableCompaniesService,
    ) {
    };

    identifyCompany(_: number, company: ICompanyResDtoModel): number {
        return company.id;
    };
}
