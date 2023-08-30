/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-user-common-signup-form.component.spec.ts
 *   Created at: 2023-06-04, 16:11:32
 *   Last updated at: 2023-08-30, 23:00:09
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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModule } from '~/app-auth/auth.module';
import { passwordMatchValidator } from '~/app-commons/validators/password-match.validator';
import {
  REGEX_COMPANY_NAME,
  REGEX_EMAIL,
  REGEX_LINK,
  REGEX_LOGIN,
  REGEX_PASSWORD,
} from '~/app-commons/validators/regex.constant';
import { AppModule } from '~/app/app.module';
import { CompanyUserCommonSignupFormComponent } from './company-user-common-signup-form.component';

describe('CompanyUserCommonSignupFormComponent', () => {
  let component: CompanyUserCommonSignupFormComponent;
  let fixture: ComponentFixture<CompanyUserCommonSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyUserCommonSignupFormComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_COMPANY_NAME),
      ]),
      site: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_LINK),
      ]),
      categories: new FormControl([], [Validators.required]),
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
