/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: response-to-opinion.component.ts
 * Last modified: 6/10/23, 8:28 AM
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

import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable, takeUntil } from "rxjs";

import { AccountRole } from "../../../commons/types/account-role.type";
import { ILoginDetailsModel } from "../../../commons/models/login.model";
import { REGEX_COMMENT } from "../../../commons/validators/regex.constant";
import { IOpinionResDtoModel } from "../../../commons/models/opinion.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { CompanyOpinionService } from "../../services/company-opinion/company-opinion.service";
import { LoggedStatusService } from "../../../commons/services/logged-status/logged-status.service";
import { PersistResponseOpinionService } from "../../services/persist-response-opinion/persist-response-opinion.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-response-to-opinion",
    templateUrl: "./response-to-opinion.component.html",
    providers: [ PersistResponseOpinionService ],
})
export class ResponseToOpinionComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
    loggedRole$: Observable<AccountRole> = this._loggedStatusService.loggedRole$;
    loggedDetails$: Observable<ILoginDetailsModel | null> = this._loggedStatusService.loggedDetails$;
    lazyLoader$: Observable<boolean> = this._persistResponseOpinionService.lazyLoader$;

    @Input() companyId!: number;
    @Input() opinion!: IOpinionResDtoModel;
    @Output() updateOpinionsEmit: EventEmitter<void> = new EventEmitter<void>();

    responseForm: FormGroup;
    companyRole = AccountRole.COMPANY;
    alreadyAdded = false;

    constructor(
        private _loggedStatusService: LoggedStatusService,
        private _companyOpinionService: CompanyOpinionService,
        private _persistResponseOpinionService: PersistResponseOpinionService,
    ) {
        super();
        this.responseForm = new FormGroup({
            "companyResponse": new FormControl("", [ Validators.required, Validators.pattern(REGEX_COMMENT) ]),
        });
    };

    ngOnDestroy() {
        this.subjectCleanup();
    };

    onSubmitResponseOpinion(): void {
        const data: { companyResponse: string } = this.responseForm.getRawValue();
        this._persistResponseOpinionService.persistResponseToOpinion$(data.companyResponse, this.opinion.userId)
            .pipe(takeUntil(this._unsubscribe)).subscribe(() => {
                this.updateOpinionsEmit.emit();
                this.alreadyAdded = true;
            });
    };
}
