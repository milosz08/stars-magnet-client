import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-root',
  template: `
    <div class="flex-fill">
      <router-outlet />
    </div>
  `,
  host: { class: 'd-flex flex-column h-100' },
})
export class AuthRootComponent {}
