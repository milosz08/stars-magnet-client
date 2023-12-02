/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
