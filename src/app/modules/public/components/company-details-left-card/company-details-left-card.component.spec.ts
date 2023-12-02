/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { SingleCompanyService } from '~/app-public/services/single-company/single-company.service';
import { AppModule } from '~/app/app.module';
import { CompanyDetailsLeftCardComponent } from './company-details-left-card.component';

describe('CompanyDetailsLeftCardComponent', () => {
  let component: CompanyDetailsLeftCardComponent;
  let fixture: ComponentFixture<CompanyDetailsLeftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SingleCompanyService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsLeftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
