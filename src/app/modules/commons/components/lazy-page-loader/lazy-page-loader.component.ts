/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoaderService } from '~/app-commons//services/lazy-loader/lazy-loader.service';
import { fadeOutAnimation } from '~/app-commons/animations/fade-out.animation';

@Component({
  selector: 'app-lazy-page-loader',
  templateUrl: './lazy-page-loader.component.html',
  styleUrls: ['./lazy-page-loader.component.scss'],
  animations: [fadeOutAnimation],
})
export class LazyPageLoaderComponent {
  isLoading$: Observable<boolean> = this._lazyLoaderService.isLoading$;

  constructor(private _lazyLoaderService: LazyLoaderService) {}
}
