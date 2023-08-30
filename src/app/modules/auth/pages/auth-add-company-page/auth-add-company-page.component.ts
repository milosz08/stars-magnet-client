/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-add-company-page.component.ts
 *   Created at: 2023-06-04, 15:52:43
 *   Last updated at: 2023-08-30, 23:00:56
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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first, takeUntil } from 'rxjs';
import { AddCompanyService } from '~/app-auth/services/add-company/add-company.service';
import { AddCompanyFormModel } from '~/app-commons/models/company.model';
import { MultiselectItemModel } from '~/app-commons/models/multiselect-input.model';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { passwordMatchValidator } from '~/app-commons/validators/password-match.validator';
import {
  REGEX_COMPANY_NAME,
  REGEX_EMAIL,
  REGEX_LINK,
  REGEX_LOGIN,
  REGEX_PASSWORD,
} from '~/app-commons/validators/regex.constant';

@Component({
  selector: 'app-auth-add-company-page',
  templateUrl: './auth-add-company-page.component.html',
  providers: [AddCompanyService],
})
export class AuthAddCompanyPageComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  addCompanyForm: FormGroup;
  allCategories: MultiselectItemModel[] = [];

  suspenseSpinner$: Observable<boolean> =
    this._addCompanyService.suspenseSpinner$;
  responseAlert$: Observable<ResponseAlertModel> =
    this._addCompanyService.responseAlert$;

  constructor(
    private readonly _addCompanyService: AddCompanyService,
    private readonly _formHelperService: FormHelperService
  ) {
    super();
    this.addCompanyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_COMPANY_NAME),
      ]),
      site: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_LINK),
      ]),
      categories: new FormControl([], [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_LOGIN),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_EMAIL),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PASSWORD),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordMatchValidator,
      ]),
    });
  }

  ngOnInit(): void {
    this._addCompanyService
      .getAllCategories$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(c => {
        this.addCompanyForm.get('categories')?.patchValue(c);
        this.allCategories = c;
      });
  }

  ngOnDestroy(): void {
    this.subjectCleanup();
  }

  onAddCompanySubmitForm(): void {
    const data: AddCompanyFormModel = this.addCompanyForm.getRawValue();
    this._addCompanyService
      .addCompany$(data)
      .pipe(first(), takeUntil(this._unsubscribe))
      .subscribe({
        next: () => this.addCompanyForm.reset(),
        error: () => {
          this.addCompanyForm.get('password')?.reset();
          this.addCompanyForm.get('confirmPassword')?.reset();
        },
      });
  }

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(
      this.addCompanyForm,
      fieldName
    );
  }

  handleChangeSelectedCategories(selectedCategories: number[]): void {
    this.addCompanyForm.get('categories')?.patchValue(selectedCategories);
  }
}
