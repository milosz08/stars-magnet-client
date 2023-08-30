/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-routing.module.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 23:08:10
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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateNonLogged } from '../commons/guards/non-logged.guard';
import { AuthRootComponent } from './auth-root.component';
import { canActivateCompanyCredentials } from './guards/after-pass-company-guard.service';
import { AuthAddCompanyPageComponent } from './pages/auth-add-company-page/auth-add-company-page.component';
import { AuthCompanyCredentialsPageComponent } from './pages/auth-company-credentials-page/auth-company-credentials-page.component';
import { AuthCompanyLoginPageComponent } from './pages/auth-company-login-page/auth-company-login-page.component';
import { AuthLoginPageComponent } from './pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from './pages/auth-register-page/auth-register-page.component';
import { AuthResetTokenPageComponent } from './pages/auth-reset-token-page/auth-reset-token-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthRootComponent,
    canActivate: [canActivateNonLogged],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthLoginPageComponent, title: 'Login' },
      {
        path: 'company-login',
        component: AuthCompanyLoginPageComponent,
        title: 'Company login',
      },
      {
        path: 'register',
        component: AuthRegisterPageComponent,
        title: 'Register',
      },
      {
        path: 'add-company',
        component: AuthAddCompanyPageComponent,
        title: 'Add company',
      },
      {
        path: 'reset-token',
        component: AuthResetTokenPageComponent,
        title: 'Reset token',
      },
      {
        path: 'company-credentials',
        component: AuthCompanyCredentialsPageComponent,
        title: 'Credentials',
        canActivate: [canActivateCompanyCredentials],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
