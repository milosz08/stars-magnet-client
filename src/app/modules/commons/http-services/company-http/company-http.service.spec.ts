import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CompanyHttpService } from './company-http.service';

describe('AddCompanyHttpService', () => {
  let service: CompanyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CompanyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
