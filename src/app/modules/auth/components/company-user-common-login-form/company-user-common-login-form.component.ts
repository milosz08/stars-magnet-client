/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';

@Component({
  selector: 'app-company-user-common-login-form',
  templateUrl: './company-user-common-login-form.component.html',
})
export class CompanyUserCommonLoginFormComponent {
  @Input() formGroup!: FormGroup;

  constructor(private readonly _formHelperService: FormHelperService) {}

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(this.formGroup, fieldName);
  }
}
