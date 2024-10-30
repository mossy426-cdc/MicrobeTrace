import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockEventEmitterService {
  invokeFirstComponentFunction = new Subject<string>();

  emitFirstComponentFunction(name: string) {
    this.invokeFirstComponentFunction.next(name);
  }
}