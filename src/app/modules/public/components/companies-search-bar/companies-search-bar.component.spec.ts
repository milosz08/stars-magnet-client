/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { PageableCompaniesService } from '~/app-public/services/pageable-companies/pageable-companies.service';
import { SearchCompanyService } from '~/app-public/services/search-company/search-company.service';
import { AppModule } from '~/app/app.module';
import { CompaniesSearchBarComponent } from './companies-search-bar.component';

describe('CompaniesSearchBarComponent', () => {
  let component: CompaniesSearchBarComponent;
  let fixture: ComponentFixture<CompaniesSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [SearchCompanyService, PageableCompaniesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
