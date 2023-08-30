/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: response-to-opinion.component.ts
 *   Created at: 2023-06-10, 08:28:39
 *   Last updated at: 2023-08-30, 22:29:01
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
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { LoginDetailsModel } from '~/app-commons/models/login.model';
import { OpinionResDtoModel } from '~/app-commons/models/opinion.model';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { AccountRole } from '~/app-commons/types/account-role.type';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';
import { REGEX_COMMENT } from '~/app-commons/validators/regex.constant';
import { PersistResponseOpinionService } from '~/app-public/services/persist-response-opinion/persist-response-opinion.service';

@Component({
  selector: 'app-response-to-opinion',
  templateUrl: './response-to-opinion.component.html',
  providers: [PersistResponseOpinionService],
})
export class ResponseToOpinionComponent
  extends AbstractComponentReactiveProvider
  implements OnDestroy
{
  isLogged$: Observable<boolean> = this._loggedStatusService.isLogged$;
  loggedRole$: Observable<AccountRole> = this._loggedStatusService.loggedRole$;
  loggedDetails$: Observable<LoginDetailsModel | null> =
    this._loggedStatusService.loggedDetails$;
  lazyLoader$: Observable<boolean> =
    this._persistResponseOpinionService.lazyLoader$;

  @Input() companyId!: number;
  @Input() opinion?: OpinionResDtoModel;
  @Output() updateOpinionsEmit: EventEmitter<void> = new EventEmitter<void>();

  responseForm: FormGroup;
  companyRole = AccountRole.COMPANY;
  alreadyAdded = false;

  constructor(
    private readonly _loggedStatusService: LoggedStatusService,
    private readonly _persistResponseOpinionService: PersistResponseOpinionService
  ) {
    super();
    this.responseForm = new FormGroup({
      companyResponse: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_COMMENT),
      ]),
    });
  }

  ngOnDestroy() {
    this.subjectCleanup();
  }

  onSubmitResponseOpinion(): void {
    const data: { companyResponse: string } = this.responseForm.getRawValue();
    this._persistResponseOpinionService
      .persistResponseToOpinion$(data.companyResponse, this.opinion!.userId)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.updateOpinionsEmit.emit();
        this.alreadyAdded = true;
      });
  }
}
