/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-root',
  template: `
    <div class="flex-fill">
      <router-outlet />
    </div>
  `,
  host: { class: 'd-flex flex-column h-100' },
})
export class PublicRootComponent {}
