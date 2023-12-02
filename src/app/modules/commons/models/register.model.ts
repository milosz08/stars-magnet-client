/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type RegisterFormModel = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterReqDto = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_Password: string;
};
