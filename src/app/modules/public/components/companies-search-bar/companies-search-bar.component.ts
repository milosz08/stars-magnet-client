/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: companies-search-bar.component.ts
 * Last modified: 6/4/23, 11:43 AM
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
import { Router } from "@angular/router";

import { Observable, takeUntil } from "rxjs";

import { SearchCompanyService } from "../../services/search-company/search-company.service";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { SearchCompanyBoxService } from "../../services/search-company-box/search-company-box.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-companies-search-bar",
    templateUrl: "./companies-search-bar.component.html",
})
export class CompaniesSearchBarComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    searchContent = "";
    isInitialLoad = true;
    searchContent$: Observable<string> = this._searchCompanyBoxService.searchContent$;

    constructor(
        private _router: Router,
        private _searchCompanyService: SearchCompanyService,
        private _searchCompanyBoxService: SearchCompanyBoxService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._searchCompanyBoxService.getDebouncedSearchResult$(this._unsubscribe).subscribe(phrase => {
            this.searchContent = phrase;
            if (this.isInitialLoad) return;
            this._searchCompanyService.loadPageable$().pipe(takeUntil(this._unsubscribe)).subscribe();
            this._searchCompanyService.loadFilteredCompanies$().pipe(takeUntil(this._unsubscribe)).subscribe();
        });
    };

    ngOnDestroy(): void {
        this.isInitialLoad = true;
        this.subjectCleanup();
    };

    onSetNewParaphrase(phrase: string): void {
        this.isInitialLoad = false;
        this._searchCompanyService.pushNewParaphrase(phrase);
    };
}
