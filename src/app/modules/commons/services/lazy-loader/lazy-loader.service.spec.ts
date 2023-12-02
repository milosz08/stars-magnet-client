/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { LazyLoaderService } from './lazy-loader.service';

describe('LazyLoaderService', () => {
  let service: LazyLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [LazyLoaderService],
    });
    service = TestBed.inject(LazyLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
