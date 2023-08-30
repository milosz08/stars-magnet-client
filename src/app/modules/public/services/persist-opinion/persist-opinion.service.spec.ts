/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: persist-opinion.service.spec.ts
 *   Created at: 2023-06-10, 05:59:50
 *   Last updated at: 2023-08-30, 22:14:43
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
