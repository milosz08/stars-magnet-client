/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { AddOpinionFormModel } from '~/app-commons/models/opinion.model';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';
import { GradeStarsService } from '~/app-commons/services/grade-stars/grade-stars.service';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { AccountRole } from '~/app-commons/types/account-role.type';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { REGEX_COMMENT } from '~/app-commons/validators/regex.constant';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { PersistOpinionService } from '~/app-public/services/persist-opinion/persist-opinion.service';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';

@Component({
  selector: 'app-create-opinion',
  templateUrl: './create-opinion.component.html',
  providers: [PersistOpinionService, GradeStarsService],
})
export class CreateOpinionComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
  loggedAccount$: Observable<AccountRole> =
    this._loggedStatusService.loggedRole$;
  lazyLoader$: Observable<boolean> = this._persistOpinionService.lazyLoader$;
  alreadyAdded$: Observable<boolean> =
    this._companyOpinionService.alreadyAdded$;

  userRole = AccountRole.USER;
  opinionForm: FormGroup;
  selectedStars = 0;
  alreadyAddedOpinion = false;

  @Input() companyId!: number;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _gradeStarsService: GradeStarsService,
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _persistOpinionService: PersistOpinionService,
    private readonly _singleCompanyService: SingleCompanyService,
    private readonly _companyOpinionService: CompanyOpinionService
  ) {
    super();
    this.opinionForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_COMMENT),
      ]),
      rating: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  ngOnDestroy() {
    this.subjectCleanup();
  }

  onSubmitCreateOpinion(): void {
    const data: AddOpinionFormModel = this.opinionForm.getRawValue();
    this._persistOpinionService
      .persistOpinionByUser$(data, this.companyId)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.clearFields();
        this.alreadyAddedOpinion = true;
        this._singleCompanyService
          .refreshCompanyDetails$(this.companyId)
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
        this._companyOpinionService
          .refreshPageable$()
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
        this._companyOpinionService
          .loadOpinions$()
          .pipe(takeUntil(this._unsubscribe))
          .subscribe();
      });
  }

  handleChangeStar(selectedIdx: number): void {
    this.getRatingField.patchValue(selectedIdx);
    this.getRatingField.markAsTouched();
  }

  clearFields(): void {
    this.opinionForm.reset();
    this.getRatingField.patchValue(null);
    this.getRatingField.markAsUntouched();
    this.selectedStars = 0;
    this._gradeStarsService.forcedClearAllStars();
  }

  handleCurrentSelectedStars(selectedNumber: number): void {
    this.selectedStars = selectedNumber;
  }

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(this.opinionForm, fieldName);
  }

  private get getRatingField(): any {
    return this.opinionForm.get('rating');
  }
}
