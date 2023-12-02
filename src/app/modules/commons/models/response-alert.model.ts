/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { AlertType } from '../utils/alert.type';

export type ResponseAlertModel = {
  type: AlertType;
  content: string;
};
