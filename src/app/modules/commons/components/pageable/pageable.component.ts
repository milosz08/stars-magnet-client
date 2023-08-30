/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: pageable.component.ts
 *   Created at: 2023-06-05, 03:40:00
 *   Last updated at: 2023-08-30, 22:40:40
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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PrePageableData,
  pageableLimits,
} from '~/app-commons/models/pagination.model';
import { PageableLimitService } from '~/app-commons/services/pageable-limit/pageable-limit.service';

@Component({
  selector: 'app-pageable',
  templateUrl: './pageable.component.html',
})
export class PageableComponent {
  pageableLimitsView = pageableLimits;
  selectedLimit$: Observable<number> =
    this._pageableLimitService.pageableLimit$;

  @Input() currentPage = 1;
  @Input() pageable!: PrePageableData;

  @Output() changePageEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() changeLimitEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly _pageableLimitService: PageableLimitService) {}

  range(count: number | undefined): number[] {
    if (!count) return [];
    return Array.from({ length: count }).map((_, i) => i);
  }

  onChangePageNumber(selectedPage: number): void {
    this.changePageEmitter.emit(selectedPage);
  }

  onChangePaginationLimit(limit: number): void {
    this._pageableLimitService.setPageableLimit(limit);
    this.changeLimitEmitter.emit();
  }
}
