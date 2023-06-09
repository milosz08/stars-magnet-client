/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: multiselect-input.component.ts
 * Last modified: 6/9/23, 2:29 AM
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";

import { IMultiselectItemModel } from "../../models/multiselect-input.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "app-multiselect-input",
    templateUrl: "./multiselect-input.component.html",
    styleUrls: [ "./multiselect-input.component.scss" ],
})
export class MultiselectInputComponent {

    scrolldownMenuActive = false;
    selectedElements: IMultiselectItemModel[] = [];

    @ViewChild("selectContainer") selectContainer!: ElementRef;

    @Input() initialElements: IMultiselectItemModel[] = [];
    @Output() selectedChangesEmit: EventEmitter<number[]> = new EventEmitter<number[]>();

    @HostListener("document:click", [ "$event" ])
    onClick(event: MouseEvent): void {
        const clickedInside = this.selectContainer.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.scrolldownMenuActive = false;
        }
    }

    handleToggleScrolldownMenu(): void {
        this.scrolldownMenuActive = !this.scrolldownMenuActive;
    };

    handleClickOnCategory(event: Event, element: IMultiselectItemModel): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedElements.push(element);
        } else {
            this.selectedElements = this.selectedElements.filter(el => el.id !== element.id);
        }
        this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
    };

    handleRemoveElement(event: Event, element: IMultiselectItemModel): void {
        event.stopImmediatePropagation();
        this.selectedElements = this.selectedElements.filter(el => el.id !== element.id);
        this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
    };

    handleSelectAllElements(event: Event): void {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedElements = this.initialElements;
        } else {
            this.selectedElements = [];
        }
        this.selectedChangesEmit.emit(this.selectedElements.map(i => i.id));
    };
}
