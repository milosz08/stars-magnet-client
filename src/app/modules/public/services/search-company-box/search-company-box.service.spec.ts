/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { SearchCompanyBoxService } from './search-company-box.service';

describe('SearchCompanyBoxService', () => {
  let service: SearchCompanyBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SearchCompanyBoxService],
    });
    service = TestBed.inject(SearchCompanyBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
