/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtRefreshInterceptor } from './jwt-refresh.interceptor';

describe('JwtRefreshInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [JwtRefreshInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: JwtRefreshInterceptor = TestBed.inject(
      JwtRefreshInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
