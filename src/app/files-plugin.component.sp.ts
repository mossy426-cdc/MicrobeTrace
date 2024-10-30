// console.log('FilesComponent spec file loaded');

// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FilesComponent } from './filesComponent/files-plugin.component';
// import { CommonService } from './contactTraceCommonServices/common.service'; // Update the path accordingly
// import { LocalStorageService } from '@shared/utils/local-storage.service';
// import { AppUrlService } from '@shared/common/nav/app-url.service';
// import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
// import { EventEmitterService } from '@shared/utils/event-emitter.service';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';

// // PrimeNG Modules
// import { DropdownModule } from 'primeng/dropdown';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { DialogModule } from 'primeng/dialog';
// import { TreeModule } from 'primeng/tree';
// import { InputTextModule } from 'primeng/inputtext';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';

// // Angular Material Modules (if used)
// import { MatMenuModule } from '@angular/material/menu';

// // Angular Core
// import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

// // Mock Services and Pipes
// import { MockCommonService } from '../tests/mocks/common.service.mock';
// import { MockLocalStorageService } from '../tests/mocks/local-storage.service.mock';
// import { MockAppUrlService } from '../tests/mocks/app-url.service.mock';
// import { MockEventEmitterService } from '../tests/mocks/event-emitter.service.mock';

// import * as $ from 'jquery'; // Import jQuery

// // 1. **Mock the 'localize' pipe**
// @Pipe({ name: 'localize' })
// class MockLocalizePipe implements PipeTransform {
//   transform(value: any): any {
//     return value; // Simply return the value without any transformation
//   }
// }

// // 2. **Mock jQuery Functions**
// // Since the component uses jQuery, we'll mock it to prevent errors during testing.
// class MockJQuery {
//   constructor(selector: any) {}
//   slideDown() { return this; }
//   slideUp() { return this; }
//   append(content: any) { return this; }
//   html(content: any) { return this; }
//   find(selector: any) { return this; }
//   on(event: any, handler: any) { return this; }
//   empty() { return this; }
//   prop(propName: string, value: any) { return this; }
//   trigger(event: string) { return this; }
// }

// import { InjectionToken } from '@angular/core';
// import { BaseComponentDirective } from './base-component.directive'; // Adjust the path as necessary

// // Mock for the GoldenLayoutContainer
// const mockGoldenLayoutContainer = {
//   // Add any necessary mock methods or properties here
// };

// describe('FilesComponent', () => {
//   let component: FilesComponent;
//   let fixture: ComponentFixture<FilesComponent>;

//   beforeEach(waitForAsync(() => {
//     // Override the global jQuery object with our mock
//     (window as any).$ = jasmine.createSpy('$').and.callFake((selector) => new MockJQuery(selector));
//     (window as any).jQuery = jasmine.createSpy('jQuery').and.callFake((selector) => new MockJQuery(selector));

//     TestBed.configureTestingModule({
//       declarations: [ 
//         FilesComponent,
//         MockLocalizePipe // **Declare the mock pipe**
//       ],
//       imports: [
//         FormsModule,
//         HttpClientModule,
//         RouterTestingModule,
//         // PrimeNG Modules
//         DropdownModule,
//         SelectButtonModule,
//         DialogModule,
//         TreeModule,
//         InputTextModule,
//         ProgressSpinnerModule,
//         // Angular Material Modules
//         MatMenuModule,
//         // Add other necessary modules here
//       ],
//       providers: [
//         { provide: CommonService, useClass: MockCommonService },
//         { provide: LocalStorageService, useClass: MockLocalStorageService },
//         { provide: AppUrlService, useClass: MockAppUrlService },
//         { provide: EventEmitterService, useClass: MockEventEmitterService },
//         // Add other providers or mocks if needed
//         {
//           provide: BaseComponentDirective.GoldenLayoutContainerInjectionToken,
//           useValue: mockGoldenLayoutContainer
//         }
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FilesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the FilesComponent', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should have a defined metric', () => {
//   //   expect(component.SelectedDefaultViewVariable).toBeTruthy();
//   // });

//   // Add more tests as needed to cover component functionalities
// });
