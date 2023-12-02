/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { FormHelperService } from './form-helper.service';

describe('FormHelperService', () => {
  let service: FormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [FormHelperService],
    });
    service = TestBed.inject(FormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
