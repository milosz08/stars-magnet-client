/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/app-auth/auth.module';
import { AppModule } from '~/app/app.module';
import { CompanyCredentialsService } from './company-credentials.service';

describe('CompanyCredentialsService', () => {
  let service: CompanyCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [CompanyCredentialsService],
    });
    service = TestBed.inject(CompanyCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
