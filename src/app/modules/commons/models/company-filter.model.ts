/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: company-filter.model.ts
 *   Created at: 2023-06-07, 02:06:39
 *   Last updated at: 2023-08-30, 22:46:50
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

export type CompanyFilterModel = {
  avgGrade: number;
  hasGrades: boolean;
  sortBy: SortByUnion;
  sortDir: SortDirUnion;
};

export type SortByUnion = 'alphabetically' | 'gradesCount' | 'gradesLevel';
export type SortDirUnion = 'ASC' | 'DESC';

export const DEF_FILTER: CompanyFilterModel = {
  avgGrade: 0,
  hasGrades: false,
  sortBy: 'alphabetically',
  sortDir: 'ASC',
};
