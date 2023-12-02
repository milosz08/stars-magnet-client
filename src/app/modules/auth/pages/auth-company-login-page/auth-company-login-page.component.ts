/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
