/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeStarsService } from '~/app-commons/services/grade-stars/grade-stars.service';
import { GradeStarsComponent } from './grade-stars.component';

describe('GradeStarsComponent', () => {
  let component: GradeStarsComponent;
  let fixture: ComponentFixture<GradeStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeStarsComponent],
      providers: [GradeStarsService],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
