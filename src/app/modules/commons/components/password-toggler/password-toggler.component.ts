/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-toggler',
  templateUrl: './password-toggler.component.html',
})
export class PasswordTogglerComponent {
  @Input() reactiveFormGroup!: FormGroup;
  @Input() reactiveControlName = '';
  @Input() elementId = 'password';
  @Input() elementTitle = '';
  @Input() elementPlaceholder = '';
  @Input() isInvalid = false;
  @Input() maxLength = 50;

  isVisible = false;

  onToggleVisibility(inptuData: string): void {
    if (inptuData === '') return;
    this.isVisible = !this.isVisible;
  }

  onChangeInputData(inptuData: string): void {
    if (inptuData !== '') return;
    this.isVisible = false;
  }
}
