/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/app/app.module';
import { CountableTextareaComponent } from './countable-textarea.component';

describe('CountableTextareaComponent', () => {
  let component: CountableTextareaComponent;
  let fixture: ComponentFixture<CountableTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CountableTextareaComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      textArea: new FormControl(''),
    });
    component.controlName = 'textArea';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
