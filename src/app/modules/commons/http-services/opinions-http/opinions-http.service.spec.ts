/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OpinionsHttpService } from './opinions-http.service';

describe('OpinionsHttpService', () => {
  let service: OpinionsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OpinionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
