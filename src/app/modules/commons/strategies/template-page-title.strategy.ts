/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly DEF_SUFFIX = 'Stars Magnet';

  constructor(private readonly _title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this._title.setTitle(`${title} | ${this.DEF_SUFFIX}`);
    } else {
      this._title.setTitle(this.DEF_SUFFIX);
    }
  }

  createCustomTitle(prefix: string): void {
    this._title.setTitle(`${prefix} | ${this.DEF_SUFFIX}`);
  }
}
