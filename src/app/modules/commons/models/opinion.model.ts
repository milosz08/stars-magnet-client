/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */

export type AddOpinionReqDtoModel = {
  companyId: number;
  comment: string;
  rating: number;
};

export type AddOpinionFormModel = {
  comment: string;
  rating: number;
};

export type OpinionResDtoModel = {
  userId: number;
  opinionId: number;
  fullname: string;
  countOfReviews: number;
  rating: number;
  ratingDate: Date;
  comment: string;
  commentDate: Date;
  companyResponse: string | null;
  responseDate: Date | null;
};

export type OpinionsPageableResDtoModel = {
  count: number;
  category: string;
  next: string | null;
  previous: string | null;
  results: OpinionResDtoModel[];
};

export type AddOpinionResDtoModel = {
  response: string;
  newOpinion: OpinionResDtoModel;
};

export type AddResponseOpinionReqDtoModel = {
  companyResponse: string;
  userId: number;
};
