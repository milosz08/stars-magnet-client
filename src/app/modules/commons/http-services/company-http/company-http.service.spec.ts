/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CompanyHttpService } from './company-http.service';

describe('AddCompanyHttpService', () => {
  let service: CompanyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CompanyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
