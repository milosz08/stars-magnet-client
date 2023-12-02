/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type RefreshModelReqDto = {
  token: string;
  refresh: string;
};

export type RefreshModelResDto = {
  access: string;
};
