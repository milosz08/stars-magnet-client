/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: dimissible-alert.component.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:35:32
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
