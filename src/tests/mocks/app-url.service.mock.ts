import { Injectable } from '@angular/core';

@Injectable()
export class MockAppUrlService {
  get appRootUrl(): string {
    return 'http://localhost/'; // Provide a mock URL
  }
}