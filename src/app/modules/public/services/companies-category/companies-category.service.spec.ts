/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { PageableCompaniesService } from '../pageable-companies/pageable-companies.service';
import { CompaniesCategoryService } from './companies-category.service';

describe('CompaniesCategoryService', () => {
  let service: CompaniesCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CompaniesCategoryService, PageableCompaniesService],
    });
    service = TestBed.inject(CompaniesCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
