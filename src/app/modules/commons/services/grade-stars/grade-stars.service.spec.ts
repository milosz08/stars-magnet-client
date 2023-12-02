/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { GradeStarsService } from './grade-stars.service';

describe('GradeStarsService', () => {
  let service: GradeStarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [GradeStarsService],
    });
    service = TestBed.inject(GradeStarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
