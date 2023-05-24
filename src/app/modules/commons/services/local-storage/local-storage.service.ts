/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: local-storage.service.ts
 * Last modified: 24/05/2023, 03:16
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

import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { StorageKeyType } from "../../types/storage-key.type";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class LocalStorageService {

    private localStorage: Storage;

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {
        if (!this.document.defaultView) {
            throw new Error("Default window environment not found!");
        }
        this.localStorage = this.document.defaultView.localStorage;
    };

    get<T>(storageKey: StorageKeyType): T | null {
        const preParsed = this.localStorage.getItem(storageKey);
        if (!preParsed) return null;
        return JSON.parse(preParsed);
    };

    save<T>(storageKey: StorageKeyType, data: T): void {
        this.localStorage.removeItem(storageKey);
        this.localStorage.setItem(storageKey, JSON.stringify(data));
    };

    remove(storageKey: StorageKeyType): void {
        this.localStorage.removeItem(storageKey);
    };

    update<T>(storageKey: StorageKeyType, field: string, newValue: any): void {
        const parsed: any = this.get(storageKey);
        if (!parsed) return;
        parsed[field] = newValue;
        this.save(storageKey, parsed);
    };
}
