/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { LazyPageLoaderComponent } from './lazy-page-loader.component';

describe('LazyPageLoaderComponent', () => {
  let component: LazyPageLoaderComponent;
  let fixture: ComponentFixture<LazyPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
