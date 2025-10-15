import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { LazyCommonsService } from './lazy-commons.service';

describe('LazyCommonsService', () => {
  let service: LazyCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [LazyCommonsService],
    });
    service = TestBed.inject(LazyCommonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
