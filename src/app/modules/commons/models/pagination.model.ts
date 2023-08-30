/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: pagination.model.ts
 *   Created at: 2023-06-04, 12:46:06
 *   Last updated at: 2023-08-30, 22:49:08
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

export type PaginationModel = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type PrePageableData = {
  countAll: number;
  countAllPages: number;
};

export interface PageableModel<T> extends PaginationModel {
  results: T[];
}

export const pageableLimits = [5, 10, 15, 20, 50, 100];
export type PageableLimitsUnion = (typeof pageableLimits)[number];
