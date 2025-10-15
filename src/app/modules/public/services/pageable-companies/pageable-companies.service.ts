import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrePageableData } from '~/app-commons/models/pagination.model';
import { CompanyResDtoModel } from '~/app-public/models/company.model';

@Injectable()
export class PageableCompaniesService {
  private _pageable$ = new BehaviorSubject<PrePageableData | null>(null);
  private _companies$ = new BehaviorSubject<CompanyResDtoModel[]>([]);

  private _lazyLoader$ = new BehaviorSubject(false);
  private _totalCount$ = new BehaviorSubject<number>(0);
  private _currentPage$ = new BehaviorSubject<number>(1);

  toggleLazyLoader(value: boolean): void {
    this._lazyLoader$.next(value);
  }

  setCurrentPage(page: number): void {
    this._currentPage$.next(page);
  }

  setCompanies(companies: CompanyResDtoModel[]): void {
    this._companies$.next(companies);
  }

  setPageable(pageableData: PrePageableData | null): void {
    if (!pageableData) return;
    this._pageable$.next(pageableData);
  }

  setTotalCount(totalCount: number): void {
    this._totalCount$.next(totalCount);
  }

  get lazyLoader$(): Observable<boolean> {
    return this._lazyLoader$.asObservable();
  }
  get companies$(): Observable<CompanyResDtoModel[]> {
    return this._companies$.asObservable();
  }
  get totalCount$(): Observable<number> {
    return this._totalCount$.asObservable();
  }
  get pageable$(): Observable<PrePageableData | null> {
    return this._pageable$.asObservable();
  }
  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }
}
