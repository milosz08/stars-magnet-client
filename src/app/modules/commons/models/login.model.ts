/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { AccountRole } from '../types/account-role.type';

export type LoginFormModel = {
  username: string;
  password: string;
};

export interface CompanyLoginFormModel extends LoginFormModel {
  token: string;
}

export type LoginDetailsModel = {
  id: number;
  username: string;
  name: string;
};

export type LoginResponseDto = {
  id: number;
  username: string;
  name: string;
  refresh: string;
  access: string;
};

export interface AutoLoginResponseDto extends LoginResponseDto {
  role: AccountRole;
}
