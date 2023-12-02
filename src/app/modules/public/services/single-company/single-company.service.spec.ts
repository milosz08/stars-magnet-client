/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { SingleCompanyService } from './single-company.service';

describe('SingleCompanyService', () => {
  let service: SingleCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SingleCompanyService],
    });
    service = TestBed.inject(SingleCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
