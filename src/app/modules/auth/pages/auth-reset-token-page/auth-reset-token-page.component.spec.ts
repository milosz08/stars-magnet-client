/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/app-auth/auth.module';
import { AppModule } from '~/app/app.module';
import { AuthResetTokenPageComponent } from './auth-reset-token-page.component';

describe('AuthResetTokenPageComponent', () => {
  let component: AuthResetTokenPageComponent;
  let fixture: ComponentFixture<AuthResetTokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthResetTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
