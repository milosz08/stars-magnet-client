/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: auth.service.ts
 * Last modified: 24/05/2023, 00:25
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
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

import { IRegisterReqDto } from "../../models/register.model";
import { ILoginFormModel, ILoginResponseDto } from "../../models/login.model";
import { IRefreshModelReqDto, IRefreshModelResDto } from "../../models/refresh.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class AuthHttpService {

    constructor(
        private _httpClient: HttpClient,
    ) {
    };

    login$(reqDto: ILoginFormModel): Observable<ILoginResponseDto> {
        return this._httpClient.post<ILoginResponseDto>(
            `${environment.httpBackendURI}/api/login`,
            reqDto,
        );
    };

    register(reqDto: IRegisterReqDto): Observable<any> {
        return this._httpClient.post<any>(
            `${environment.httpBackendURI}/api/register`,
            reqDto,
        );
    };

    refresh$(reqDto: IRefreshModelReqDto): Observable<IRefreshModelResDto> {
        return this._httpClient.post<IRefreshModelResDto>(
            `${environment.httpBackendURI}/api/token/refresh`,
            reqDto,
        );
    };

    autoLogin$(reqDto: IRefreshModelReqDto): Observable<IAutoLoginResponseDto> {
        return this._httpClient.post<IAutoLoginResponseDto>(
            `${environment.httpBackendURI}/api/login/auto`,
            reqDto,
        );
    };
}
