import { Subject } from 'rxjs';

export abstract class AbstractComponentReactiveProvider {
  protected readonly _unsubscribe: Subject<void> = new Subject<void>();

  protected subjectCleanup(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
