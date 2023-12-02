/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first, takeUntil } from 'rxjs';
import { AuthService } from '~/app-auth/services/auth/auth.service';
import { RegisterFormModel } from '~/app-commons/models/register.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { passwordMatchValidator } from '~/app-commons/validators/password-match.validator';
import {
  REGEX_EMAIL,
  REGEX_LOGIN,
  REGEX_NAME,
  REGEX_PASSWORD,
} from '~/app-commons/validators/regex.constant';

@Component({
  selector: 'app-auth-register-page',
  templateUrl: './auth-register-page.component.html',
  providers: [AuthService, LazyCommonsService],
})
export class AuthRegisterPageComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  registerForm: FormGroup;

  suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
  responseAlert$: Observable<ResponseAlertModel> =
    this._authCommonsService.responseAlert$;

  constructor(
    private readonly _authService: AuthService,
    private readonly _formHelperService: FormHelperService,
    private readonly _authCommonsService: LazyCommonsService
  ) {
    super();
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_NAME),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_NAME),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_LOGIN),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_EMAIL),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PASSWORD),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordMatchValidator,
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onRegisterFormSubmit(): void {
    const data: RegisterFormModel = this.registerForm.getRawValue();
    this._authService
      .register$(data)
      .pipe(first(), takeUntil(this._unsubscribe))
      .subscribe({
        next: () => this.registerForm.reset(),
        error: () => {
          this.registerForm.get('password')?.reset();
          this.registerForm.get('confirmPassword')?.reset();
        },
      });
  }

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(this.registerForm, fieldName);
  }
}
