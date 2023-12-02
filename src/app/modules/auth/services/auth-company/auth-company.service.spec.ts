/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/app-auth/auth.module';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { AppModule } from '~/app/app.module';
import { AuthCompanyService } from './auth-company.service';

describe('AuthCompanyService', () => {
  let service: AuthCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AuthCompanyService, LazyCommonsService],
    });
    service = TestBed.inject(AuthCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
