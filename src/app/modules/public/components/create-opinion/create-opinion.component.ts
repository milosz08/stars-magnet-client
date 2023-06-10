/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: create-opinion.component.ts
 * Last modified: 6/9/23, 9:28 PM
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
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable, takeUntil } from "rxjs";

import { AccountRole } from "../../../commons/types/account-role.type";
import { REGEX_COMMENT } from "../../../commons/validators/regex.constant";
import { IAddOpinionFormModel } from "../../../commons/models/opinion.model";
import { AbstractComponentReactiveProvider } from "../../../commons/utils/abstract-component-reactive-provider";

import { SingleCompanyService } from "../../services/single-company/single-company.service";
import { GradeStarsService } from "../../../commons/services/grade-stars/grade-stars.service";
import { FormHelperService } from "../../../commons/services/form-helper/form-helper.service";
import { CompanyOpinionService } from "../../services/company-opinion/company-opinion.service";
import { PersistOpinionService } from "../../services/persist-opinion/persist-opinion.service";
import { LoggedStatusService } from "../../../commons/services/logged-status/logged-status.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-create-opinion",
    templateUrl: "./create-opinion.component.html",
    providers: [ PersistOpinionService, GradeStarsService ],
})
export class CreateOpinionComponent extends AbstractComponentReactiveProvider implements OnDestroy {

    isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
    loggedAccount$: Observable<AccountRole> = this._loggedStatusService.loggedRole$;
    lazyLoader$: Observable<boolean> = this._persistOpinionService.lazyLoader$;
    alreadyAdded$: Observable<boolean> = this._companyOpinionService.alreadyAdded$;

    userRole = AccountRole.USER;
    opinionForm: FormGroup;
    selectedStars = 0;
    alreadyAddedOpinion = false;

    @Input() companyId!: number;

    constructor(
        private _formHelperService: FormHelperService,
        private _gradeStarsService: GradeStarsService,
        private _loggedStatusService: LoggedStatusService,
        private _persistOpinionService: PersistOpinionService,
        private _singleCompanyService: SingleCompanyService,
        private _companyOpinionService: CompanyOpinionService,
    ) {
        super();
        this.opinionForm = new FormGroup({
            "comment": new FormControl("", [ Validators.required, Validators.pattern(REGEX_COMMENT) ]),
            "rating": new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(10) ]),
        });
    };

    ngOnDestroy() {
        this.subjectCleanup();
    };

    onSubmitCreateOpinion(): void {
        const data: IAddOpinionFormModel = this.opinionForm.getRawValue();
        this._persistOpinionService.persistOpinionByUser$(data, this.companyId).pipe(takeUntil(this._unsubscribe))
            .subscribe(() => {
                this.clearFields();
                this.alreadyAddedOpinion = true;
                this._singleCompanyService.refreshCompanyDetails$(this.companyId)
                    .pipe(takeUntil(this._unsubscribe)).subscribe();
                this._companyOpinionService.refreshPageable$().pipe(takeUntil(this._unsubscribe)).subscribe();
                this._companyOpinionService.loadOpinions$().pipe(takeUntil(this._unsubscribe)).subscribe();
            });
    };

    handleChangeStar(selectedIdx: number): void {
        this.getRatingField.patchValue(selectedIdx);
        this.getRatingField.markAsTouched();
    };

    clearFields(): void {
        this.opinionForm.reset();
        this.getRatingField.patchValue(null);
        this.getRatingField.markAsUntouched();
        this.selectedStars = 0;
        this._gradeStarsService.forcedClearAllStars();
    };

    handleCurrentSelectedStars(selectedNumber: number): void {
        this.selectedStars = selectedNumber;
    };

    validateField(fieldName: string): boolean {
        return this._formHelperService.validateField(this.opinionForm, fieldName);
    };

    private get getRatingField(): any {
        return this.opinionForm.get("rating");
    };
}
