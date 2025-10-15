import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app/app.module';
import { FileHelperService } from './file-helper.service';

describe('FileHelperService', () => {
  let service: FileHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [FileHelperService],
    });
    service = TestBed.inject(FileHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
