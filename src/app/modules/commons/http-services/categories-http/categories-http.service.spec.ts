import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CategoriesHttpService } from './categories-http.service';

describe('CategoriesHttpService', () => {
  let service: CategoriesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CategoriesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
