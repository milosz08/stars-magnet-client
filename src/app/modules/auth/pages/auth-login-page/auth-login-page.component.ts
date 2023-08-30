/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-login-page.component.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 23:02:55
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
