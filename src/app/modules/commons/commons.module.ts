/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as NgbBts from '@ng-bootstrap/ng-bootstrap';
import { CountableTextareaComponent } from './components/countable-textarea/countable-textarea.component';
import { DimissibleAlertComponent } from './components/dimissible-alert/dimissible-alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { GradeStarsComponent } from './components/grade-stars/grade-stars.component';
import { HeaderComponent } from './components/header/header.component';
import { LazyPageLoaderComponent } from './components/lazy-page-loader/lazy-page-loader.component';
import { MultiselectInputComponent } from './components/multiselect-input/multiselect-input.component';
import { PageableComponent } from './components/pageable/pageable.component';
import { PasswordTogglerComponent } from './components/password-toggler/password-toggler.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { OnlyFirstPipe } from './pipes/only-first/only-first.pipe';

@NgModule({
  declarations: [
    CountableTextareaComponent,
    DimissibleAlertComponent,
    FooterComponent,
    GradeStarsComponent,
    HeaderComponent,
    LazyPageLoaderComponent,
    MultiselectInputComponent,
    NotFoundPageComponent,
    OnlyFirstPipe,
    PageableComponent,
    PasswordTogglerComponent,
    ToastMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbBts.NgbAlert,
    NgbBts.NgbCollapse,
    NgbBts.NgbDropdown,
    NgbBts.NgbDropdownMenu,
    NgbBts.NgbDropdownToggle,
    NgbBts.NgbToast,
    NgbBts.NgbDropdownItem,
    NgbBts.NgbPagination,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  exports: [
    CountableTextareaComponent,
    DimissibleAlertComponent,
    FooterComponent,
    GradeStarsComponent,
    HeaderComponent,
    LazyPageLoaderComponent,
    MultiselectInputComponent,
    OnlyFirstPipe,
    PageableComponent,
    PasswordTogglerComponent,
    ToastMessageComponent,
  ],
})
export class CommonsModule {}
