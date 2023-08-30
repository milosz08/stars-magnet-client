/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: public-routing.module.ts
 *   Created at: 2023-05-29, 02:09:51
 *   Last updated at: 2023-08-30, 22:10:00
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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicCategoryPageComponent } from './pages/public-category-page/public-category-page.component';
import { PublicCompanyPageComponent } from './pages/public-company-page/public-company-page.component';
import { PublicFilteredCompaniesPageComponent } from './pages/public-filtered-companies-page/public-filtered-companies-page.component';
import { PublicStartPageComponent } from './pages/public-start-page/public-start-page.component';
import { PublicRootComponent } from './public-root.component';

const routes: Routes = [
  {
    path: '',
    component: PublicRootComponent,
    children: [
      {
        path: '',
        component: PublicStartPageComponent,
        title: 'Home',
        pathMatch: 'full',
      },
      { path: 'category/:categoryId', component: PublicCategoryPageComponent },
      { path: 'company/:companyId', component: PublicCompanyPageComponent },
      {
        path: 'companies',
        component: PublicFilteredCompaniesPageComponent,
        title: 'Companies',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
