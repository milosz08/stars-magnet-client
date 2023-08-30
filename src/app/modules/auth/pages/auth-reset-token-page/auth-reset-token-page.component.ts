/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-reset-token-page.component.ts
 *   Created at: 2023-06-08, 00:40:40
 *   Last updated at: 2023-08-30, 23:04:21
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
