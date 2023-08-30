/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company.model.ts
 *   Created at: 2023-06-04, 13:43:43
 *   Last updated at: 2023-08-30, 22:46:56
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
