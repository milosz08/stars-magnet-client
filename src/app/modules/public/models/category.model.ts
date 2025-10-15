import { PageableModel } from '~/app-commons/models/pagination.model';

export type CategoryResDtoModel = {
  name: string;
  icon: string;
};

export interface CategoryModel extends CategoryResDtoModel {
  id: number;
}

export type PageableCategories = PageableModel<CategoryModel>;
