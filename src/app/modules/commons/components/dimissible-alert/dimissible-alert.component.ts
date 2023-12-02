/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component, Input } from '@angular/core';
import { ResponseAlertModel } from '~/app-commons/models/response-alert.model';

@Component({
  selector: 'app-dimissible-alert',
  templateUrl: './dimissible-alert.component.html',
  host: { class: 'px-0' },
})
export class DimissibleAlertComponent {
  @Input() model!: ResponseAlertModel | null;

  onClose(): void {
    if (!this.model) return;
    this.model.content = '';
  }
}
