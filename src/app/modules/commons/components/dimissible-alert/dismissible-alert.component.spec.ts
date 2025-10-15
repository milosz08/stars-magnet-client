import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DismissibleAlertComponent } from './dismissible-alert.component';

describe('DismissibleAlertComponent', () => {
  let component: DismissibleAlertComponent;
  let fixture: ComponentFixture<DismissibleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DismissibleAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DismissibleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
