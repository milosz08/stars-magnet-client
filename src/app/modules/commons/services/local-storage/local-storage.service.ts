/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageKeyType } from '~/app-commons/types/storage-key.type';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private localStorage: Storage;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    if (!this.document.defaultView) {
      throw new Error('Default window environment not found!');
    }
    this.localStorage = this.document.defaultView.localStorage;
  }

  get<T>(storageKey: StorageKeyType): T | null {
    const preParsed = this.localStorage.getItem(storageKey);
    if (!preParsed) return null;
    return JSON.parse(preParsed);
  }

  save<T>(storageKey: StorageKeyType, data: T): void {
    this.localStorage.removeItem(storageKey);
    this.localStorage.setItem(storageKey, JSON.stringify(data));
  }

  remove(storageKey: StorageKeyType): void {
    this.localStorage.removeItem(storageKey);
  }

  update(storageKey: StorageKeyType, field: string, newValue: any): void {
    const parsed: any = this.get(storageKey);
    if (!parsed) return;
    parsed[field] = newValue;
    this.save(storageKey, parsed);
  }
}
