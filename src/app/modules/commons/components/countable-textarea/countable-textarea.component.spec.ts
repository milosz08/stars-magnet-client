/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: countable-textarea.component.spec.ts
 *   Created at: 2023-06-10, 10:09:04
 *   Last updated at: 2023-08-30, 22:35:09
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
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app/app.module';
import { CountableTextareaComponent } from './countable-textarea.component';

describe('CountableTextareaComponent', () => {
  let component: CountableTextareaComponent;
  let fixture: ComponentFixture<CountableTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CountableTextareaComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      textArea: new FormControl(''),
    });
    component.controlName = 'textArea';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
