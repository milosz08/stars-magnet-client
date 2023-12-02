/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { PageableModel } from '~/app-commons/models/pagination.model';

export type CategoryResDtoModel = {
  name: string;
  icon: string;
};

export interface CategoryModel extends CategoryResDtoModel {
  id: number;
}

export type PageableCategories = PageableModel<CategoryModel>;
