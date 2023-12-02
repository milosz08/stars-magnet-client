/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type IGradeModel = {
  id: number;
  mode: GradeType;
};

export enum GradeType {
  HOLLOW,
  FILL,
}
