/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: create-opinion.component.spec.ts
 *   Created at: 2023-06-09, 21:28:49
 *   Last updated at: 2023-08-30, 22:26:14
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
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { PublicModule } from '~/app-public/public.module';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';
import { AppModule } from '~/app/app.module';
import { CreateOpinionComponent } from './create-opinion.component';

describe('CreateOpinionComponent', () => {
  let component: CreateOpinionComponent;
  let fixture: ComponentFixture<CreateOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [
        LoggedStatusService,
        SingleCompanyService,
        CompanyOpinionService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
