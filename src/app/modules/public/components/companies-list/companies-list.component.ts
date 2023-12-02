/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
