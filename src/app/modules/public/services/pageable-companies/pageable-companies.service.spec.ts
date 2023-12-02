/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { PageableCompaniesService } from './pageable-companies.service';

describe('PageableCompaniesService', () => {
  let service: PageableCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [PageableCompaniesService],
    });
    service = TestBed.inject(PageableCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
