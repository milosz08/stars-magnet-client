/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: public-filtered-companies-page.component.ts
 * Last modified: 6/6/23, 3:54 PM
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

import { Component, OnDestroy, OnInit } from "@angular/core";

import { Observable, takeUntil } from "rxjs";

import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { SearchCompanyService } from "../../services/search-company/search-company.service";
import { PageableCompaniesService } from "../../services/pageable-companies/pageable-companies.service";
import { SearchCompanyBoxService } from "../../services/search-company-box/search-company-box.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-public-filtered-companies-page",
    templateUrl: "./public-filtered-companies-page.component.html",
    providers: [ PageableCompaniesService, SearchCompanyService ],
})
export class PublicFilteredCompaniesPageComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    searchContent$: Observable<string> = this._searchCompanyBoxService.searchContent$;

    constructor(
        private _searchCompanyService: SearchCompanyService,
        private _searchCompanyBoxService: SearchCompanyBoxService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._searchCompanyService.loadPageable().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._searchCompanyService.loadFilteredCompanies().pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    onChangePage(page: number): void {
        this._searchCompanyService.moveToPage(page).pipe(takeUntil(this._unsubscribe)).subscribe();
    };

    onChangeLimit(): void {
        this._searchCompanyService.refreshPageable().pipe(takeUntil(this._unsubscribe)).subscribe();
        this._searchCompanyService.loadFilteredCompanies().pipe(takeUntil(this._unsubscribe)).subscribe();
    };
}
