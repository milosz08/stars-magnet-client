/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app/app.module';
import { PasswordTogglerComponent } from './password-toggler.component';

describe('PasswordTogglerComponent', () => {
  let component: PasswordTogglerComponent;
  let fixture: ComponentFixture<PasswordTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordTogglerComponent);
    component = fixture.componentInstance;

    component.reactiveFormGroup = new FormGroup({
      password: new FormControl(''),
    });
    component.reactiveControlName = 'password';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
