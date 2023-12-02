/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedStatusService } from '~/app-commons/services/logged-status/logged-status.service';
import { PublicModule } from '~/app-public/public.module';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';
import { AppModule } from '~/app/app.module';
import { CreateOpinionComponent } from './create-opinion.component';

describe('CreateOpinionComponent', () => {
  let component: CreateOpinionComponent;
  let fixture: ComponentFixture<CreateOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [
        LoggedStatusService,
        SingleCompanyService,
        CompanyOpinionService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
