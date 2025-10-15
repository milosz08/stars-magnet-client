export type ToastModel = {
  enabled: boolean;
  content: string;
  type: ToastType;
};

export enum ToastType {
  INFO = 'INFO',
  DANGER = 'DANGER',
}
