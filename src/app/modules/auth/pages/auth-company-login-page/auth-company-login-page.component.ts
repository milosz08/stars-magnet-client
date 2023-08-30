/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-company-login-page.component.ts
 *   Created at: 2023-06-07, 21:02:13
 *   Last updated at: 2023-08-30, 23:02:19
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first, takeUntil } from 'rxjs';
import { AuthCompanyService } from '~/app-auth/services/auth-company/auth-company.service';
import { CompanyLoginFormModel } from '~/app-commons/models/login.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-auth-company-login-page',
  templateUrl: './auth-company-login-page.component.html',
  providers: [AuthCompanyService, LazyCommonsService],
})
export class AuthCompanyLoginPageComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  companyLoginForm: FormGroup;

  suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
  responseAlert$: Observable<ResponseAlertModel> =
    this._authCommonsService.responseAlert$;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _authCompanyService: AuthCompanyService,
    private readonly _authCommonsService: LazyCommonsService
  ) {
    super();
    this.companyLoginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onLoginCompanyFormSubmit(): void {
    const data: CompanyLoginFormModel = this.companyLoginForm.getRawValue();
    this._authCompanyService
      .login$(data)
      .pipe(first(), takeUntil(this._unsubscribe))
      .subscribe({
        next: () => this.companyLoginForm.reset(),
        error: () => {
          this.companyLoginForm.get('password')?.reset();
          this.companyLoginForm.get('token')?.reset();
        },
      });
  }

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(
      this.companyLoginForm,
      fieldName
    );
  }
}
