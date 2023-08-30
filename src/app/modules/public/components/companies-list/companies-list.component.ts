/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: companies-list.component.ts
 *   Created at: 2023-06-05, 00:04:12
 *   Last updated at: 2023-08-30, 22:23:38
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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { RouterHelperService } from '~/app-commons/services/router-helper/router-helper.service';
import { CompanyResDtoModel } from '~/app-public/models/company.model';
import { PageableCompaniesService } from '~/app-public/services/pageable-companies/pageable-companies.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  providers: [RouterHelperService],
})
export class CompaniesListComponent {
  @Input() categoryName = '';
  @Input() categoriesAreFullVisibled = false;

  @Output() emitChangePageEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() emitChangeLimit: EventEmitter<void> = new EventEmitter<void>();

  lazyLoader$: Observable<boolean> = this._pageableCompanyService.lazyLoader$;
  companies$: Observable<CompanyResDtoModel[]> =
    this._pageableCompanyService.companies$;
  currentPage$: Observable<number> = this._pageableCompanyService.currentPage$;
  pageable$: Observable<PrePageableData | null> =
    this._pageableCompanyService.pageable$;

  constructor(
    private readonly _pageableCompanyService: PageableCompaniesService
  ) {}

  identifyCompany(_: number, company: CompanyResDtoModel): number {
    return company.id;
  }
}
