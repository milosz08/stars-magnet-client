/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { CompanyFilterService } from './company-filter.service';

describe('CompanyFilterService', () => {
  let service: CompanyFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CompanyFilterService],
    });
    service = TestBed.inject(CompanyFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
