/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/app-auth/auth.module';
import { AppModule } from '~/app/app.module';
import { AddCompanyService } from './add-company.service';

describe('AddCompanyService', () => {
  let service: AddCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AddCompanyService],
    });
    service = TestBed.inject(AddCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
