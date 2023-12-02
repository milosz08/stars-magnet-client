/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { AppModule } from '~/app/app.module';
import { OpinionsListComponent } from './opinions-list.component';

describe('OpininsListComponent', () => {
  let component: OpinionsListComponent;
  let fixture: ComponentFixture<OpinionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CompanyOpinionService],
    }).compileComponents();

    fixture = TestBed.createComponent(OpinionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
