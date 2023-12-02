/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({ name: 'onlyFirst' })
export class OnlyFirstPipe implements PipeTransform {
  transform(value: ValidationErrors | null): string | null {
    if (!value) {
      return null;
    }
    const keys = Object.keys(value);
    if (keys && keys.length > 0) {
      return keys[0];
    }
    return null;
  }
}
