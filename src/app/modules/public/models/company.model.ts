/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { CategoryModel } from './category.model';

export type CompanysPageableResDtoModel = {
  count: number;
  category: string;
  next: string | null;
  previous: string | null;
  results: CompanyResDtoModel[];
};

export type CompanyResDtoModel = {
  id: number;
  name: string;
  site: string;
  avgRatings: number | null | string;
  opinionsCount: number;
  categories: CategoryModel[];
};
