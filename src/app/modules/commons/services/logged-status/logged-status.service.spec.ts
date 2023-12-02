/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { LoggedStatusService } from './logged-status.service';

describe('LoggedStatusService', () => {
  let service: LoggedStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [LoggedStatusService],
    });
    service = TestBed.inject(LoggedStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
