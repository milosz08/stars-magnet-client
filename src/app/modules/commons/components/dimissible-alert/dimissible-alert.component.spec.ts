/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: dimissible-alert.component.spec.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:35:24
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
