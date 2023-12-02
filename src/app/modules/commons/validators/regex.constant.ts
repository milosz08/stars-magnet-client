/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export const REGEX_NAME = /^.{2,70}$/;

export const REGEX_LOGIN = /^[a-z\d]{3,30}$/;

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const REGEX_PASSWORD =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;

export const REGEX_COMPANY_NAME = /^.{2,80}$/;

export const REGEX_LINK = /^https:\/\/[^ "]{7,200}$/;

export const REGEX_COMMENT = /^.{10,1000}$/;
