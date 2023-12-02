/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { PersistResponseOpinionService } from './persist-response-opinion.service';

describe('PersistResponseOpinionService', () => {
  let service: PersistResponseOpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [PersistResponseOpinionService],
    });
    service = TestBed.inject(PersistResponseOpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
