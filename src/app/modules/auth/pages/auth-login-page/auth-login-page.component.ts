/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, first, takeUntil } from 'rxjs';
import { AuthService } from '~/app-auth/services/auth/auth.service';
import { LoginFormModel } from '~/app-commons/models/login.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { ToastType } from '~/app-commons/models/toast.model';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { ToastMessageService } from '~/app-commons/services/toast-message/toast-message.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  providers: [AuthService, LazyCommonsService],
})
export class AuthLoginPageComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  loginForm: FormGroup;

  suspenseSpinner$: Observable<boolean> = this._authCommonsService.lazyLoader$;
  responseAlert$: Observable<ResponseAlertModel> =
    this._authCommonsService.responseAlert$;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _authCommonsService: LazyCommonsService,
    private readonly _toastMessageService: ToastMessageService
  ) {
    super();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onLoginFormSubmit(): void {
    const data: LoginFormModel = this.loginForm.getRawValue();
    this._authService
      .login$(data)
      .pipe(first(), takeUntil(this._unsubscribe))
      .subscribe({
        next: () => {
          this._router.navigate(['/']).then(() => {
            this._toastMessageService.showToast(
              'You has been successfully logged.',
              ToastType.INFO
            );
          });
        },
        error: () => this.loginForm.get('password')?.reset(),
      });
  }
}
