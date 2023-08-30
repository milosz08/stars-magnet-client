/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-company-credentials-page.component.ts
 *   Created at: 2023-06-04, 13:57:35
 *   Last updated at: 2023-08-30, 23:01:52
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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CompanyCredentialsService } from '~/app-auth/services/company-credentials/company-credentials.service';
import { PassCompanyResDto } from '~/app-commons/models/company.model';
import { FileHelperService } from '~/app-commons/services/file-helper/file-helper.service';
import { AbstractComponentReactiveProvider } from '~/app-commons/utils/abstract-component-reactive-provider';

@Component({
  selector: 'app-auth-company-credentials-page',
  templateUrl: './auth-company-credentials-page.component.html',
})
export class AuthCompanyCredentialsPageComponent
  extends AbstractComponentReactiveProvider
  implements OnInit, OnDestroy
{
  companyCred: PassCompanyResDto | null = null;

  constructor(
    private _fileHelperService: FileHelperService,
    private _companyCredentialsService: CompanyCredentialsService
  ) {
    super();
  }

  ngOnInit(): void {
    this._companyCredentialsService.companyCredentials$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(data => (this.companyCred = data));
  }

  ngOnDestroy(): void {
    this._companyCredentialsService.resetCredentials();
    this.subjectCleanup();
  }

  saveToFile(): void {
    if (!this.companyCred) return;
    const { token, responseWords } = this.companyCred;
    const formattedData =
      'Token:\n' + token + '\n\nResponse words:\n' + responseWords.join('\n');
    this._fileHelperService.saveTextToFile(formattedData, 'secure-data.txt');
  }
}
