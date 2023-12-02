/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
