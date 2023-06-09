/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: company-details-left-card.component.ts
 * Last modified: 6/9/23, 5:31 PM
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

import { ICompanyResDtoModel } from "../../models/company.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { SingleCompanyService } from "../../services/single-company/single-company.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-company-details-left-card",
    templateUrl: "./company-details-left-card.component.html",
    styleUrls: [ "./company-details-left-card.component.scss" ],
})
export class CompanyDetailsLeftCardComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    companyDetails!: ICompanyResDtoModel;
    starsStructure$: Observable<string[]> = this._singleCompanyService.starsStructure$;

    constructor(
        private _singleCompanyService: SingleCompanyService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._singleCompanyService.companyDetails$.pipe(takeUntil(this._unsubscribe))
            .subscribe(d => this.companyDetails = d!);
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };
}
