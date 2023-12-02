/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
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
