/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: countable-textarea.component.ts
 *   Created at: 2023-06-10, 10:09:04
 *   Last updated at: 2023-08-30, 22:34:51
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
