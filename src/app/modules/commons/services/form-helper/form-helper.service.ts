/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormHelperService {
  validateField(formGroup: FormGroup, formControlName: string): boolean {
    const formControl = formGroup.get(formControlName);
    if (!formControl) {
      throw new Error(`Form control name ${formControlName} not exist`);
    }
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
