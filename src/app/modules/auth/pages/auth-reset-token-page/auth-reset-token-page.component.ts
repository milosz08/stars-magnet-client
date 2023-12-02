/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { AuthCompanyService } from '~/app-auth/services/auth-company/auth-company.service';
import { ResetTokenReqDto } from '~/app-commons/models/company.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-auth-forgot-token-page',
  templateUrl: './auth-reset-token-page.component.html',
  providers: [AuthCompanyService, LazyCommonsService],
})
export class AuthResetTokenPageComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  resetTokenForm: FormGroup;
  defWords = Array.from({ length: 10 }).fill('');

  suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
  responseAlert$: Observable<ResponseAlertModel> =
    this._authCommonsService.responseAlert$;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _authCompanyService: AuthCompanyService,
    private readonly _authCommonsService: LazyCommonsService
  ) {
    super();
    this.resetTokenForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      words: new FormArray(
        Array.from({ length: 10 }).map(
          () => new FormControl('', Validators.required)
        )
      ),
    });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onResetTokenFormSubmit(): void {
    const data: ResetTokenReqDto = this.resetTokenForm.getRawValue();
    this._authCompanyService
      .resetToken$(data)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: () => this.resetTokenForm.reset(),
        error: () =>
          this.resetTokenForm.get('words')?.patchValue(this.defWords),
      });
  }

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(
      this.resetTokenForm,
      fieldName
    );
  }

  get someWordsAreInvalid(): boolean {
    return this.resetTokenForm
      .get('words')
      ?.getRawValue()
      .some((v: string) => v === '');
  }

  get wordsInputs(): FormControl[] {
    return (this.resetTokenForm.get('words') as FormArray)
      .controls as FormControl[];
  }
}
