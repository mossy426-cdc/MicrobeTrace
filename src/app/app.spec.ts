// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CommonService } from './contactTraceCommonServices/common.service'; // Update the path accordingly
// import { LocalStorageService } from '@shared/utils/local-storage.service';
// import { MockCommonService } from '../tests/mocks/common.service.mock';
// import { MockLocalStorageService } from '../tests/mocks/local-storage.service.mock';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
// import { NO_ERRORS_SCHEMA } from '@angular/core'; // Import NO_ERRORS_SCHEMA
// import { AppComponent } from './app.component';
// // Import other necessary modules and dependencies

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AppComponent ],
//       imports: [
//         FormsModule,
//         HttpClientModule,
//         RouterTestingModule, // Add RouterTestingModule here
//         // Add other necessary modules here
//       ],
//       providers: [
//         { provide: CommonService, useClass: MockCommonService },
//         { provide: LocalStorageService, useClass: MockLocalStorageService }
//         // Provide other services or dependencies as needed
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Add schemas to ignore unknown components/directives
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create app component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a defined title', () => {
//     expect(component.title).toBeTruthy();
//   });

//   // Add more tests as needed
// });
