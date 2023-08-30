/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: abstract-component-reactive-provider.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 22:55:45
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
import { Subject } from 'rxjs';

export abstract class AbstractComponentReactiveProvider {
  protected readonly _unsubscribe: Subject<void> = new Subject<void>();

  protected subjectCleanup(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
