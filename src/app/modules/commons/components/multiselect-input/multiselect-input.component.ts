/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: multiselect-input.component.ts
 *   Created at: 2023-06-09, 02:29:27
 *   Last updated at: 2023-08-30, 22:40:11
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
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MultiselectItemModel } from '~/app-commons/models/multiselect-input.model';

@Component({
  selector: 'app-multiselect-input',
  templateUrl: './multiselect-input.component.html',
  styleUrls: ['./multiselect-input.component.scss'],
})
export class MultiselectInputComponent {
  scrolldownMenuActive = false;
  selectedElements: MultiselectItemModel[] = [];

  @ViewChild('selectContainer') selectContainer!: ElementRef;

  @Input() initialElements: MultiselectItemModel[] = [];
  @Output() selectedChangesEmit: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInside = this.selectContainer.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.scrolldownMenuActive = false;
    }
  }

  handleToggleScrolldownMenu(): void {
    this.scrolldownMenuActive = !this.scrolldownMenuActive;
  }

  handleClickOnCategory(event: Event, element: MultiselectItemModel): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedElements.push(element);
    } else {
      this.selectedElements = this.selectedElements.filter(
        el => el.id !== element.id
      );
    }
    this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
  }

  handleRemoveElement(event: Event, element: MultiselectItemModel): void {
    event.stopImmediatePropagation();
    this.selectedElements = this.selectedElements.filter(
      el => el.id !== element.id
    );
    this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
  }

  handleSelectAllElements(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedElements = this.initialElements;
    } else {
      this.selectedElements = [];
    }
    this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
  }
}
