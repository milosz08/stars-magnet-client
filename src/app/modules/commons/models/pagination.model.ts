/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
