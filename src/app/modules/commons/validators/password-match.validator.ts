/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { FormControl } from '@angular/forms';

export function passwordMatchValidator(
  control: FormControl
): { [key: string]: boolean } | null {
  const password = control.root.get('password')?.value;
  const confirmPassword = control.value;
  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}
