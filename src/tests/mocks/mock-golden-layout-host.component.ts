import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-golden-layout-host', // **Ensure the selector matches the real component**
  template: ''
})
export class MockGoldenLayoutHostComponent {
  // Mocked Properties and Methods as needed for tests
  goldenLayout = {
    newComponent: jasmine.createSpy('newComponent').and.returnValue({
      container: {}
    })
  };

  getComponentRef = jasmine.createSpy('getComponentRef').and.returnValue({
    instance: {}
  });

  removeComponent = jasmine.createSpy('removeComponent');

  TabRemovedEvent = new EventEmitter<string>();
  TabChangedEvent = new EventEmitter<string>();

  initialise = jasmine.createSpy('initialise');

  // **Add any additional mocked properties or methods that your tests rely on**
}