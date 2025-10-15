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
