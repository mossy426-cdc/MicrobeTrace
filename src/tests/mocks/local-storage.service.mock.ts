export class MockLocalStorageService {
  private store: { [key: string]: any } = {};

  getItem(key: string, callback: (err: any, result: any) => void): void {
    const result = this.store[key] || null;
    callback(null, result);
  }

  setItem(key: string, value: any, callback?: (err: any) => void): void {
    this.store[key] = value;
    if (callback) {
      callback(null);
    }
  }

  removeItem(key: string, callback?: (err: any) => void): void {
    delete this.store[key];
    if (callback) {
      callback(null);
    }
  }

  clear(callback?: (err: any) => void): void {
    this.store = {};
    if (callback) {
      callback(null);
    }
  }
}
