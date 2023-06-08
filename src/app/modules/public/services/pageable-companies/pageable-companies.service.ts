/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: pageable-companies.service.ts
 * Last modified: 6/6/23, 7:59 PM
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

import { BehaviorSubject, Observable } from "rxjs";

import { ICompanyResDtoModel } from "../../models/company.model";
import { IPrePageableData } from "../../../commons/models/pagination.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class PageableCompaniesService {

    private _pageable$: BehaviorSubject<IPrePageableData | null> = new BehaviorSubject<IPrePageableData | null>(null);
    private _companies$: BehaviorSubject<ICompanyResDtoModel[]> = new BehaviorSubject<ICompanyResDtoModel[]>([]);

    private _lazyLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    toggleLazyLoader(value: boolean): void {
        this._lazyLoader$.next(value);
    };

    setCurrentPage(page: number): void {
        this._currentPage$.next(page);
    };

    setCompanies(companies: ICompanyResDtoModel[]): void {
        this._companies$.next(companies);
    };

    setPageable(pageableData: IPrePageableData | null): void {
        if (!pageableData) return;
        this._pageable$.next(pageableData);
    };

    setTotalCount(totalCount: number): void {
        this._totalCount$.next(totalCount);
    };

    get lazyLoader$(): Observable<boolean> { return this._lazyLoader$.asObservable(); };
    get companies$(): Observable<ICompanyResDtoModel[]> { return this._companies$.asObservable(); };
    get totalCount$(): Observable<number> { return this._totalCount$.asObservable(); };
    get pageable$(): Observable<IPrePageableData | null> { return this._pageable$.asObservable(); };
    get currentPage$(): Observable<number> { return this._currentPage$.asObservable(); };
}
