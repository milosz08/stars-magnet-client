/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
