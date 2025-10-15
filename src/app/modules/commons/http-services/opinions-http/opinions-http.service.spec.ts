import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OpinionsHttpService } from './opinions-http.service';

describe('OpinionsHttpService', () => {
  let service: OpinionsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OpinionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
