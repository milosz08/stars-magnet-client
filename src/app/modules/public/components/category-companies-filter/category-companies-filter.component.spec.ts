/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { CategoryCompaniesFilterComponent } from './category-companies-filter.component';

describe('CategoryCompaniesFilterComponent', () => {
  let component: CategoryCompaniesFilterComponent;
  let fixture: ComponentFixture<CategoryCompaniesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCompaniesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
