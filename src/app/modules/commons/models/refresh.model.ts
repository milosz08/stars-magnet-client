export type RefreshModelReqDto = {
  token: string;
  refresh: string;
};

export type RefreshModelResDto = {
  access: string;
};
