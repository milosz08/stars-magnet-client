/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: public.module.ts
 * Last modified: 24/05/2023, 16:28
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import * as NgbBts from "@ng-bootstrap/ng-bootstrap";

import { PublicRootComponent } from "./public-root.component";
import { PublicRoutingModule } from "./public-routing.module";
import { CommonsModule } from "../commons/commons.module";

import { PublicStartPageComponent } from "./pages/public-start-page/public-start-page.component";
import { PublicCategoryPageComponent } from "./pages/public-category-page/public-category-page.component";
import { PublicCompanyPageComponent } from "./pages/public-company-page/public-company-page.component";
import { PublicFilteredCompaniesPageComponent } from "./pages/public-filtered-companies-page/public-filtered-companies-page.component";

import { CompaniesListComponent } from "./components/companies-list/companies-list.component";
import { HomeCategoriesComponent } from "./components/home-categories/home-categories.component";
import { CompaniesSearchBarComponent } from "./components/companies-search-bar/companies-search-bar.component";
import { CategoryCompaniesFilterComponent } from "./components/category-companies-filter/category-companies-filter.component";
import { CompanyDetailsLeftCardComponent } from "./components/company-details-left-card/company-details-left-card.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    declarations: [
        PublicRootComponent,
        // pages
        PublicStartPageComponent,
        PublicCategoryPageComponent,
        PublicCompanyPageComponent,
        PublicFilteredCompaniesPageComponent,
        // components
        CompaniesListComponent,
        HomeCategoriesComponent,
        CompaniesSearchBarComponent,
        CategoryCompaniesFilterComponent,
        CompanyDetailsLeftCardComponent,
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        FormsModule,
        CommonsModule,
        NgbBts.NgbAccordionDirective,
        NgbBts.NgbAccordionItem,
        NgbBts.NgbAccordionHeader,
        NgbBts.NgbAccordionButton,
        NgbBts.NgbAccordionCollapse,
        NgbBts.NgbAccordionBody,
        NgbBts.NgbDropdown,
        NgbBts.NgbDropdownToggle,
        NgbBts.NgbDropdownMenu,
    ],
})
export class PublicModule {
}
