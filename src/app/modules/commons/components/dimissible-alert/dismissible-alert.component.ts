import { Component, Input } from '@angular/core';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';

@Component({
  selector: 'app-dismissible-alert',
  templateUrl: './dismissible-alert.component.html',
  host: { class: 'px-0' },
})
export class DismissibleAlertComponent {
  @Input() model!: ResponseAlertModel | null;

  onClose(): void {
    if (!this.model) return;
    this.model.content = '';
  }
}
