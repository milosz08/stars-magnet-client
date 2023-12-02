/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from '~/app-commons/services/form-helper/form-helper.service';

@Component({
  selector: 'app-countable-textarea',
  templateUrl: './countable-textarea.component.html',
})
export class CountableTextareaComponent {
  length = 0;

  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() placeholder = '';
  @Input() maxLength: number = 1000;

  constructor(private readonly _formHelperService: FormHelperService) {}

  validateField(fieldName: string): boolean {
    return this._formHelperService.validateField(this.formGroup, fieldName);
  }

  onUpdateInputCharatersCount(event: Event) {
    this.length = (event.target as HTMLTextAreaElement).value.length;
  }
}
