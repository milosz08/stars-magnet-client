/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { CompanyOpinionService } from './company-opinion.service';

describe('CompanyOpinionService', () => {
  let service: CompanyOpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CompanyOpinionService],
    });
    service = TestBed.inject(CompanyOpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
