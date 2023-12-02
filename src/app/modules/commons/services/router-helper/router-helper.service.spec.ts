/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { RouterHelperService } from './router-helper.service';

describe('RouterHelperService', () => {
  let service: RouterHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [RouterHelperService],
    });
    service = TestBed.inject(RouterHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
