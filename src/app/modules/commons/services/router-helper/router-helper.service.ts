/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: router-helper.service.ts
 * Last modified: 6/5/23, 5:31 AM
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

import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { takeUntil } from "rxjs";

import { AbstractComponentReactiveProvider } from "../../utils/abstract-component-reactive-provider";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class RouterHelperService extends AbstractComponentReactiveProvider implements OnDestroy {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        super();
    };

    getIntFromRouteAndParse(paramName: string, redirectTo: string): number {
        const paramValue = this._route.snapshot.paramMap.get(paramName);
        if (!paramValue) {
            this._router.navigate([ redirectTo ]).then(r => r);
            return 0;
        }
        return Number(paramValue);
    };

    checkAndExtractCategoryId(callback: (categoryId: number) => void): void {
        this._route.paramMap.pipe(takeUntil(this._unsubscribe)).subscribe((params: any) => {
            const categoryId = params.get("categoryId");
            if (!categoryId) {
                this._router.navigate([ "/" ]).then(r => r);
                return;
            }
            callback(categoryId);
        });
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };
}
