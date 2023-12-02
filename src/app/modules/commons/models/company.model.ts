/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type AddCompanyFormModel = {
  name: string;
  site: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  categories: number[];
};

export type AddCompanyReqDto = {
  name: string;
  site: string;
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  categories: number[];
};

export type ResetTokenReqDto = {
  user: string;
  words: string[];
};

export type PassCompanyResDto = {
  token: string;
  response: string;
  responseWords: string[];
};
