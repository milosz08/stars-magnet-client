/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: pageable.component.ts
 * Last modified: 6/5/23, 3:40 AM
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

import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Observable } from "rxjs";

import { IPrePageableData, pageableLimits } from "../../models/pagination.model";
import { PageableLimitService } from "../../services/pageable-limit/pageable-limit.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-pageable",
    templateUrl: "./pageable.component.html",
})
export class PageableComponent {

    pageableLimitsView = pageableLimits;
    selectedLimit$: Observable<number> = this._pageableLimitService.pageableLimit$;

    @Input() currentPage = 1;
    @Input() pageable!: IPrePageableData;

    @Output() changePageEmitter: EventEmitter<number> = new EventEmitter<number>();
    @Output() changeLimitEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _pageableLimitService: PageableLimitService,
    ) {
    };

    range(count: number | undefined): number[] {
        if (!count) return [];
        return Array.from({ length: count }).map((_, i) => i);
    };

    increasePageNumber(): void {
        this.changePageEmitter.emit(++this.currentPage);
    };

    decreasePageNumber(): void {
        this.changePageEmitter.emit(--this.currentPage);
    };

    onChangePageNumber(pageNumber: number | undefined): void {
        this.changePageEmitter.emit(pageNumber);
    };

    onChangePaginationLimit(limit: number): void {
        this._pageableLimitService.setPageableLimit(limit);
        this.changeLimitEmitter.emit();
    };
}
