/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DimissibleAlertComponent } from './dimissible-alert.component';

describe('DimissibleAlertComponent', () => {
  let component: DimissibleAlertComponent;
  let fixture: ComponentFixture<DimissibleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimissibleAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DimissibleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
