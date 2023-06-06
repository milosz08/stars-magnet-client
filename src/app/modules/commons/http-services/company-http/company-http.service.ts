/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: company-http.service.ts
 * Last modified: 6/4/23, 1:37 PM
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

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

import { IPrePageableData } from "../../models/pagination.model";
import { IAddCompanyReqDto, IAddCompanyResDto } from "../../models/company.model";
import { ICompanysPageableResDtoModel } from "../../../public/models/company.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class CompanyHttpService {

    constructor(
        private _httpClient: HttpClient,
    ) {
    };

    addCompany(reqDto: IAddCompanyReqDto): Observable<IAddCompanyResDto> {
        return this._httpClient.post<IAddCompanyResDto>(
            `${environment.httpBackendURI}/api/company`,
            reqDto,
        );
    };

    getPageableData(categoryId: number, fixedLimit: number): Observable<IPrePageableData> {
        return this._httpClient.get<IPrePageableData>(
            `${environment.httpBackendURI}/api/company/${categoryId}/pageable/${fixedLimit}`,
        );
    };

    getPageableAllData(query: string, fixedLimit: number): Observable<IPrePageableData> {
        const params = new HttpParams().set("query", query);
        return this._httpClient.get<IPrePageableData>(
            `${environment.httpBackendURI}/api/company/pageable/${fixedLimit}`,
            { params },
        );
    };

    getAllCompaniesByCategory(categoryId: number, fixedLimit: number, offset: number)
        : Observable<ICompanysPageableResDtoModel> {
        const params = new HttpParams()
            .set("limit", fixedLimit)
            .set("offset", offset);
        return this._httpClient.get<ICompanysPageableResDtoModel>(
            `${environment.httpBackendURI}/api/category/${categoryId}`,
            { params },
        );
    };

    getAllCompaniesByQuery(query: string, fixedLimit: number, offset: number): Observable<ICompanysPageableResDtoModel> {
        const params = new HttpParams()
            .set("limit", fixedLimit)
            .set("offset", offset)
            .set("query", query);
        return this._httpClient.get<ICompanysPageableResDtoModel>(
            `${environment.httpBackendURI}/api/search`,
            { params },
        );
    };
}
