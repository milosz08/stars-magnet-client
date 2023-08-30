/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: lazy-page-loader.component.ts
 *   Created at: 2023-05-28, 16:33:20
 *   Last updated at: 2023-08-30, 22:39:46
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
