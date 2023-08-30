/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: opinions-list.component.spec.ts
 *   Created at: 2023-06-09, 21:29:26
 *   Last updated at: 2023-08-30, 22:28:11
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
import { PublicModule } from '~/app-public/public.module';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { AppModule } from '~/app/app.module';
import { OpinionsListComponent } from './opinions-list.component';

describe('OpininsListComponent', () => {
  let component: OpinionsListComponent;
  let fixture: ComponentFixture<OpinionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CompanyOpinionService],
    }).compileComponents();

    fixture = TestBed.createComponent(OpinionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
