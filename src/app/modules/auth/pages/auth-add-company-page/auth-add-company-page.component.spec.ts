/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { AuthModule } from '../../auth.module';
import { AuthAddCompanyPageComponent } from './auth-add-company-page.component';

describe('AuthAddCompanyPageComponent', () => {
  let component: AuthAddCompanyPageComponent;
  let fixture: ComponentFixture<AuthAddCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthAddCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
