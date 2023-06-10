/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: opinion.model.ts
 * Last modified: 6/9/23, 9:46 PM
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

export interface IAddOpinionReqDtoModel {
    companyId: number;
    comment: string;
    rating: number;
}

export interface IAddOpinionFormModel {
    comment: string;
    rating: number;
}

export interface IOpinionResDtoModel {
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
}

export interface IOpinionsPageableResDtoModel {
    count: number;
    category: string;
    next: string | null;
    previous: string | null;
    results: IOpinionResDtoModel[];
}

export interface IAddOpinionResDtoModel {
    response: string;
    newOpinion: IOpinionResDtoModel;
}

export interface IAddResponseOpinionReqDtoModel {
    companyResponse: string;
    userId: number;
}
