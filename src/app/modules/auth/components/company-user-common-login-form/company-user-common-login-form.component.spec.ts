/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModule } from '~/app-auth/auth.module';
import { AppModule } from '~/app/app.module';
import { CompanyUserCommonLoginFormComponent } from './company-user-common-login-form.component';

describe('CompanyUserCommonLoginFormComponent', () => {
  let component: CompanyUserCommonLoginFormComponent;
  let fixture: ComponentFixture<CompanyUserCommonLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyUserCommonLoginFormComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
