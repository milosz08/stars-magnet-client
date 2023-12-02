/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
