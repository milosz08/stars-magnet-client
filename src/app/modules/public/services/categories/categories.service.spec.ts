import { TestBed } from '@angular/core/testing';
import { LazyCommonsService } from '~/app-commons/services/lazy-commons/lazy-commons.service';
import { PublicModule } from '~/app-public/public.module';
import { AppModule } from '~/app/app.module';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PublicModule],
      providers: [CategoriesService, LazyCommonsService],
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
