/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: opinions-http.service.spec.ts
 *   Created at: 2023-06-09, 21:48:55
 *   Last updated at: 2023-08-30, 22:45:37
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
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OpinionsHttpService } from './opinions-http.service';

describe('OpinionsHttpService', () => {
  let service: OpinionsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OpinionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
