/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
