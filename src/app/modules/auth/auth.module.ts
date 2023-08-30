/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth.module.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 23:08:19
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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from '../commons/commons.module';
import { AuthRootComponent } from './auth-root.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CompanyUserCommonLoginFormComponent } from './components/company-user-common-login-form/company-user-common-login-form.component';
import { CompanyUserCommonSignupFormComponent } from './components/company-user-common-signup-form/company-user-common-signup-form.component';
import { CompanyCredentialsGuard } from './guards/after-pass-company-guard.service';
import { AuthAddCompanyPageComponent } from './pages/auth-add-company-page/auth-add-company-page.component';
import { AuthCompanyCredentialsPageComponent } from './pages/auth-company-credentials-page/auth-company-credentials-page.component';
import { AuthCompanyLoginPageComponent } from './pages/auth-company-login-page/auth-company-login-page.component';
import { AuthLoginPageComponent } from './pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from './pages/auth-register-page/auth-register-page.component';
import { AuthResetTokenPageComponent } from './pages/auth-reset-token-page/auth-reset-token-page.component';
import { CompanyCredentialsService } from './services/company-credentials/company-credentials.service';

@NgModule({
  declarations: [
    AuthAddCompanyPageComponent,
    AuthCompanyCredentialsPageComponent,
    AuthCompanyLoginPageComponent,
    AuthLoginPageComponent,
    AuthRegisterPageComponent,
    AuthResetTokenPageComponent,
    AuthRootComponent,
    CompanyUserCommonLoginFormComponent,
    CompanyUserCommonSignupFormComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    CommonsModule,
    FormsModule,
    NgbAlert,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [CompanyCredentialsGuard, CompanyCredentialsService],
})
export class AuthModule {}
