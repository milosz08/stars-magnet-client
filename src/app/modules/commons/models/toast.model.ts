/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type ToastModel = {
  enabled: boolean;
  content: string;
  type: ToastType;
};

export enum ToastType {
  INFO = 'INFO',
  DANGER = 'DANGER',
}
