/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: search-company.service.spec.ts
 *   Created at: 2023-06-06, 16:11:09
 *   Last updated at: 2023-08-30, 22:16:13
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
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { PageableCompaniesService } from '../pageable-companies/pageable-companies.service';
import { SearchCompanyService } from './search-company.service';

describe('SearchCompanyService', () => {
  let service: SearchCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SearchCompanyService, PageableCompaniesService],
    });
    service = TestBed.inject(SearchCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
