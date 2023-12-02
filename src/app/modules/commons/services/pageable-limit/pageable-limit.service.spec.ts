/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { PageableLimitService } from './pageable-limit.service';

describe('PageableLimitService', () => {
  let service: PageableLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PageableLimitService],
    });
    service = TestBed.inject(PageableLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
