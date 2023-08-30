/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: opinion.model.ts
 *   Created at: 2023-06-09, 21:41:25
 *   Last updated at: 2023-08-30, 22:48:27
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
