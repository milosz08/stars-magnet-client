/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: grade-stars.component.spec.ts
 *   Created at: 2023-06-06, 23:49:30
 *   Last updated at: 2023-08-30, 22:38:12
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
import { GradeStarsService } from '~/app-commons/services/grade-stars/grade-stars.service';
import { GradeStarsComponent } from './grade-stars.component';

describe('GradeStarsComponent', () => {
  let component: GradeStarsComponent;
  let fixture: ComponentFixture<GradeStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeStarsComponent],
      providers: [GradeStarsService],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
