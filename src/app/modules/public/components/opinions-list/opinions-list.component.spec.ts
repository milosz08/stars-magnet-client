import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicModule } from '~/app-public/public.module';
import { CompanyOpinionService } from '~/app-public/services/company-opinion/company-opinion.service';
import { AppModule } from '~/app/app.module';
import { OpinionsListComponent } from './opinions-list.component';

describe('OpinionsListComponent', () => {
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
