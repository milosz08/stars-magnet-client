/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { PersistOpinionService } from './persist-opinion.service';

describe('PersistOpinionService', () => {
  let service: PersistOpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [PersistOpinionService],
    });
    service = TestBed.inject(PersistOpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
