import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { RouterHelperService } from './router-helper.service';

describe('RouterHelperService', () => {
  let service: RouterHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [RouterHelperService],
    });
    service = TestBed.inject(RouterHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
