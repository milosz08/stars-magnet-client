/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCompanyBoxService } from '~/app-public/services/search-company-box/search-company-box.service';

@Component({
  selector: 'app-public-start-page',
  templateUrl: './public-start-page.component.html',
  host: { class: 'd-flex flex-column h-100' },
})
export class PublicStartPageComponent {
  searchParaphrase = '';

  constructor(
    private readonly _router: Router,
    private readonly _searchCompanyBoxService: SearchCompanyBoxService
  ) {}

  onSearchParaphrase(): void {
    this._searchCompanyBoxService.pushNewParaphrase(this.searchParaphrase);
    this._router.navigate(['/companies']).then(r => r);
  }
}
