/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: app-root.component.ts
 * Last modified: 23/05/2023, 09:58
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { first, Subject, takeUntil } from "rxjs";

import { AbstractComponentReactiveProvider } from "./modules/commons/utils/abstract-component-reactive-provider";

import { LazyLoaderService } from "./modules/commons/services/lazy-loader/lazy-loader.service";
import { LoggedStatusService } from "./modules/commons/services/logged-status/logged-status.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-root",
    template: `
        <app-lazy-page-loader/>
        <app-toast-message aria-live="polite" aria-atomic="true" class="forced-top"/>
        <app-header/>
        <div class="d-flex flex-column flex-fill header-top-margin container">
            <router-outlet/>
        </div>
        <app-footer/>
    `,
    host: { class: "d-flex flex-column h-100" },
})
export class AppRootComponent extends AbstractComponentReactiveProvider implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router,
        private _lazyLoaderService: LazyLoaderService,
        private _loggedStatusService: LoggedStatusService,
    ) {
        super();
    };

    ngOnInit(): void {
        this._lazyLoaderService.activateLazyLoader();
        this._loggedStatusService.refresh$().pipe(first(), takeUntil(this.unsubscribe$)).subscribe();
    };

    ngOnDestroy(): void {
        this.subjectCleanup();
    };
}
