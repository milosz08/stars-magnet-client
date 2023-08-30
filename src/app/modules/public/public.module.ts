/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: public.module.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:09:37
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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as NgbBts from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from '../commons/commons.module';
import { CategoryCompaniesFilterComponent } from './components/category-companies-filter/category-companies-filter.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompaniesSearchBarComponent } from './components/companies-search-bar/companies-search-bar.component';
import { CompanyDetailsLeftCardComponent } from './components/company-details-left-card/company-details-left-card.component';
import { CreateOpinionComponent } from './components/create-opinion/create-opinion.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { OpinionsListComponent } from './components/opinions-list/opinions-list.component';
import { ResponseToOpinionComponent } from './components/response-to-opinion/response-to-opinion.component';
import { PublicCategoryPageComponent } from './pages/public-category-page/public-category-page.component';
import { PublicCompanyPageComponent } from './pages/public-company-page/public-company-page.component';
import { PublicFilteredCompaniesPageComponent } from './pages/public-filtered-companies-page/public-filtered-companies-page.component';
import { PublicStartPageComponent } from './pages/public-start-page/public-start-page.component';
import { PublicRootComponent } from './public-root.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    CategoryCompaniesFilterComponent,
    CompaniesListComponent,
    CompaniesSearchBarComponent,
    CompanyDetailsLeftCardComponent,
    CreateOpinionComponent,
    HomeCategoriesComponent,
    OpinionsListComponent,
    PublicCategoryPageComponent,
    PublicCompanyPageComponent,
    PublicFilteredCompaniesPageComponent,
    PublicRootComponent,
    PublicStartPageComponent,
    ResponseToOpinionComponent,
  ],
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    NgbBts.NgbAccordionDirective,
    NgbBts.NgbAccordionItem,
    NgbBts.NgbAccordionHeader,
    NgbBts.NgbAccordionButton,
    NgbBts.NgbAccordionCollapse,
    NgbBts.NgbAccordionBody,
    NgbBts.NgbDropdown,
    NgbBts.NgbDropdownToggle,
    NgbBts.NgbDropdownMenu,
    PublicRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PublicModule {}
