/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: companies-search-bar.component.spec.ts
 *   Created at: 2023-06-04, 11:43:22
 *   Last updated at: 2023-08-30, 22:24:51
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
import { PageableCompaniesService } from '~/app-public/services/pageable-companies/pageable-companies.service';
import { SearchCompanyService } from '~/app-public/services/search-company/search-company.service';
import { AppModule } from '~/app/app.module';
import { CompaniesSearchBarComponent } from './companies-search-bar.component';

describe('CompaniesSearchBarComponent', () => {
  let component: CompaniesSearchBarComponent;
  let fixture: ComponentFixture<CompaniesSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SearchCompanyService, PageableCompaniesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
