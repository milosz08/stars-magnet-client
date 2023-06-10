/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: public-company-page.component.ts
 * Last modified: 6/5/23, 5:25 AM
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

import { takeUntil } from "rxjs";

import { TemplatePageTitleStrategy } from "../../../commons/strategies/template-page-title.strategy";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { SingleCompanyService } from "../../services/single-company/single-company.service";
import { CompanyOpinionService } from "../../services/company-opinion/company-opinion.service";
import { RouterHelperService } from "../../../commons/services/router-helper/router-helper.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-public-company-page",
    templateUrl: "./public-company-page.component.html",
    styleUrls: [ "./public-company-page.component.scss" ],
    providers: [ SingleCompanyService, CompanyOpinionService, RouterHelperService ],
})
export class PublicCompanyPageComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    isLoaded = false;
    companyId!: number;
    companyName = "";

    constructor(
        private _routerHelperService: RouterHelperService,
        private _singleCompanyService: SingleCompanyService,
        private _companyOpinionsService: CompanyOpinionService,
        private _templatePageTitleStrategy: TemplatePageTitleStrategy,
    ) {
        super();
    };

    ngOnInit(): void {
        this._routerHelperService.checkAndExtractParamId("companyId", "/companies",
            companyId => this.loadContent(Number(companyId)));
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };

    private loadContent(companyId: number): void {
        this.companyId = companyId;
        this._singleCompanyService.loadCompanyDetails$(companyId).pipe(takeUntil(this._unsubscribe)).subscribe(d => {
            this._companyOpinionsService.loadPageable$(companyId).pipe(takeUntil(this._unsubscribe)).subscribe();
            this._companyOpinionsService.loadOpinions$().pipe(takeUntil(this._unsubscribe)).subscribe();
            this.companyName = d.name;
            this._templatePageTitleStrategy.createCustomTitle(d.name);
            this.isLoaded = true;
        });
    };
}
