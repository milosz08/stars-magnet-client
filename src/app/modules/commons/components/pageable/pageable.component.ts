/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
