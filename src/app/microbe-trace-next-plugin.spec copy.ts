import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { MicrobeTraceNextHomeComponent } from './microbe-trace-next-plugin.component';
import { CommonService } from './contactTraceCommonServices/common.service'; // Update the path accordingly
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { MockCommonService } from '../tests/mocks/common.service.mock';
import { MockLocalStorageService } from '../tests/mocks/local-storage.service.mock';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core'; // To ignore unknown elements
import { MatMenuModule } from '@angular/material/menu'; // Add Angular Material Menu Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { AppUrlService } from '@shared/common/nav/app-url.service'; // Import AppUrlService
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';

import { By } from '@angular/platform-browser';

import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { MockGoldenLayoutHostComponent } from '../tests/mocks/mock-golden-layout-host.component'; // Adjust the path as needed
import { GoldenLayoutComponentService } from './golden-layout-component.service'; // Adjust the path as needed


// 1. Mock the 'localize' pipe
@Pipe({ name: 'localize' })
class MockLocalizePipe implements PipeTransform {
  transform(value: any): any {
    return value; // Simply return the value without any transformation
  }
}
// 2. Mock the AppUrlService
class MockAppUrlService {
  get appRootUrl(): string {
    return 'http://localhost/'; // Provide a mock URL
  }
}


describe('MicrobeTraceNextHomeComponent', () => {
  let component: MicrobeTraceNextHomeComponent;
  let fixture: ComponentFixture<MicrobeTraceNextHomeComponent>;
  let commonService: CommonService;
  let mockGoldenLayoutHost: MockGoldenLayoutHostComponent;

  // MockGoldenLayoutHostComponent with necessary methods
  // const mockGoldenLayoutHostComponent: Partial<GoldenLayoutHostComponent> & {
  //   goldenLayout: jasmine.SpyObj<any>;
  //   removeComponent: jasmine.Spy;
  //   newComponent: jasmine.Spy;
  //   getComponentRef: jasmine.Spy;
  // } = {
  //   goldenLayout: jasmine.createSpyObj('GoldenLayout', [
  //     'registerComponent',
  //     'registerComponentConstructor',
  //     'registerComponentFactoryFunction',
  //     'registerComponentFunction',
  //     'setWindowTitle',
  //     'init',
  //     'destroy',
  //     'removeComponent', // Ensure 'removeComponent' is mocked
  //     'newComponent' // Ensure 'newComponent' is mocked
  //   ]),
  //   removeComponent: jasmine.createSpy('removeComponent'), // Additional mocking if needed
  //   newComponent: jasmine.createSpy('newComponent').and.returnValue({ // Mock return value as needed
  //     container: {},
  //     type: 'component'
  //   }),
  //   getComponentRef: jasmine.createSpy('getComponentRef').and.returnValue({ // Mock 'getComponentRef' if used
  //     instance: {}
  //   })
  //   // ... mock other necessary properties or methods ...
  // };

  beforeEach(waitForAsync(() => {
    mockGoldenLayoutHost = new MockGoldenLayoutHostComponent();

    TestBed.configureTestingModule({
      declarations: [
        MicrobeTraceNextHomeComponent,
        MockLocalizePipe, // Declare the mock pipe
        MockGoldenLayoutHostComponent // Declare the mock component
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule, // Import RouterTestingModule
        MatMenuModule, // Include MatMenuModule
        BrowserAnimationsModule, // Include BrowserAnimationsModule
        DropdownModule,
        SelectButtonModule,
        DialogModule,
        TreeModule,
        InputTextModule,
        // Add other necessary modules here
      ],
      providers: [
        { provide: CommonService, useClass: MockCommonService },
        { provide: LocalStorageService, useClass: MockLocalStorageService },
        { provide: AppUrlService, useClass: MockAppUrlService },
        // ... other providers if needed ...
      ],
      schemas: [NO_ERRORS_SCHEMA] // Add schemas to ignore unknown components/directives
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobeTraceNextHomeComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService);
    
    // Access the mock via ViewChild
    const goldenLayoutHostDebugElement = fixture.debugElement.query(By.directive(MockGoldenLayoutHostComponent));
    mockGoldenLayoutHost = goldenLayoutHostDebugElement.componentInstance as MockGoldenLayoutHostComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined metric', () => {
    expect(component.metric).toBeTruthy();
  });

  /// ### 1. Testing addComponent Method
  it('should add a new component and initialize it correctly', fakeAsync(() => {
    const initialTabCount = component.homepageTabs.length;
    const newComponentName = 'Table';

    // Ensure spies are correctly setup on mock
    mockGoldenLayoutHost.goldenLayout.newComponent.and.returnValue({ container: {} });
    mockGoldenLayoutHost.getComponentRef.and.returnValue({ instance: {} });

    // Spy on necessary methods
    spyOn(component, 'addTab').and.callThrough();
    spyOn(component, 'setActiveTabProperties').and.callThrough();
    spyOn(component, 'loadSettings').and.callThrough();
    // Call addComponent
    component.addComponent(newComponentName);
    tick(); // Simulate asynchronous passage of time
    expect(component.homepageTabs.length).toBe(initialTabCount + 1);
    expect(component.addTab).toHaveBeenCalledWith(
      newComponentName,
      jasmine.any(String),
      component.activeTabIndex,
      jasmine.anything()
    );
    expect(component.setActiveTabProperties).toHaveBeenCalled();
    expect(component.loadSettings).toHaveBeenCalled();
    expect(mockGoldenLayoutHost.goldenLayout.newComponent).toHaveBeenCalledWith(newComponentName);
  }));

  // /// ### 2. Testing removeComponent Method
  // it('should remove a component correctly', () => {
  //   // Add a mock tab
  //   const componentName = 'Map';
  //   component.homepageTabs.push({ label: componentName, tabTitle: componentName, isActive: false, componentRef: null });
  //   const initialTabCount = component.homepageTabs.length;
  //   // Remove the component
  //   component.removeComponent(componentName);
  //   expect(component.homepageTabs.length).toBe(initialTabCount - 1);
  //   expect(component.homepageTabs.find(tab => tab.label === componentName)).toBeUndefined();
  // });

  // /// ### 3. Testing deleteFile Method
  // it('should delete a file at the specified index', () => {
  //   // Add mock files
  //   component.files = [
  //     { name: 'file1.csv', contents: 'data1' },
  //     { name: 'file2.csv', contents: 'data2' },
  //     { name: 'file3.csv', contents: 'data3' }
  //   ];
  //   const initialFileCount = component.files.length;
  //   // Delete the second file
  //   component.deleteFile(1);
  //   expect(component.files.length).toBe(initialFileCount - 1);
  //   expect(component.files[1].name).toBe('file3.csv');
  // });

  // /// ### 4. Testing onSearchFieldChange Method
  // it('should update search-field widget and call onSearch when search field changes', () => {
  //   spyOn(component, 'onSearch');
  //   const newSearchValue = 'example search';
  //   component.onSearchFieldChange(newSearchValue);
  //   expect(commonService.session.style.widgets['search-field']).toBe(newSearchValue);
  //   expect(component.onSearch).toHaveBeenCalled();
  // });

  // /// ### 5. Testing onWholeWordChange Method
  // it('should toggle search-whole-word widget and call onSearch', () => {
  //   spyOn(component, 'onSearch');
  //   const initialValue = commonService.session.style.widgets['search-whole-word'];
  //   component.onWholeWordChange();
  //   expect(commonService.session.style.widgets['search-whole-word']).toBe(!initialValue);
  //   expect(component.onSearch).toHaveBeenCalled();
  // });

  // /// ### 6. Testing onCaseSensitiveChange Method
  // it('should toggle search-case-sensitive widget and call onSearch', () => {
  //   spyOn(component, 'onSearch');
  //   const initialValue = commonService.session.style.widgets['search-case-sensitive'];
  //   component.onCaseSensitiveChange();
  //   expect(commonService.session.style.widgets['search-case-sensitive']).toBe(!initialValue);
  //   expect(component.onSearch).toHaveBeenCalled();
  // });

  // /// ### 7. Testing prepareFilesLists Method
  // it('should prepare files list correctly', fakeAsync(() => {
  //   // Arrange
  //   spyOn(component, '_removeGlView').and.callThrough();
  //   spyOn(component, 'getfileContent').and.callFake(() => { });
  //   spyOn((window as any), '$').and.returnValue({
  //     fadeOut: () => { },
  //     fadeTo: () => { },
  //     fadeIn: () => { },
  //     slideUp: () => { },
  //     slideDown: () => { }
  //   });
    
  //   // Mock GoldenLayoutHostComponent methods
  //   mockGoldenLayoutHost.removeComponent.and.callThrough();
    
  //   // Create a mock FileList using DataTransfer
  //   const dataTransfer = new DataTransfer();
  //   dataTransfer.items.add(new File(['data1'], 'test1.csv', { type: 'text/csv' }));
  //   dataTransfer.items.add(new File(['data2'], 'test2.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  //   const mockEvent = {
  //     target: {
  //       files: dataTransfer.files
  //     }
  //   };
    
  //   // Initialize homepageTabs with a 'Files' tab
  //   component.homepageTabs = [
  //       { label: 'Files', tabTitle: 'Files', isActive: false, componentRef: null }
  //   ];
  
  //   // Act
  //   component.prepareFilesLists(mockEvent);
  //   tick();
  
  //   // Set 'Files' tab to active
  //   component.homepageTabs[0].isActive = true;
  
  //   // Assert
  //   expect(commonService.session.files.length).toBe(2);
  //   expect(commonService.session.style.widgets).toBeDefined();
  //   expect(component.homepageTabs[0].isActive).toBeTrue();
  //   expect(mockGoldenLayoutHost.removeComponent).toHaveBeenCalledWith('2D Network');
  //   expect(component.getfileContent).toHaveBeenCalledWith(mockEvent.target.files);
  //   expect((window as any).$('#overlay').fadeOut).toHaveBeenCalled();
  //   expect((window as any).$('.ui-tabview-nav').fadeTo).toHaveBeenCalledWith("slow", 1);
  //   expect((window as any).$('.m-portlet').fadeTo).toHaveBeenCalledWith("slow", 1);
  //   expect(component.showExport).toBeFalse();
  //   expect(component.showCenter).toBeFalse();
  //   expect(component.showPinAllNodes).toBeFalse();
  //   expect(component.showRefresh).toBeFalse();
  //   expect(component.showButtonGroup).toBeFalse();
  //   expect(component.showSorting).toBeFalse();
  // }));
  
  // /// ### 8. Testing updatedVisualization Method
  // it('should call publishUpdateVisualization and handle switch cases correctly', () => {
  //   spyOn(commonService.visuals.microbeTrace, 'publishUpdateVisualization').and.callThrough();
  //   // Mock homepageTabs
  //   component.homepageTabs = [
  //     { label: '2D Network', tabTitle: '2D Network', isActive: false, componentRef: null },
  //     { label: 'PhylogeneticTree', tabTitle: 'PhylogeneticTree', isActive: false, componentRef: null },
  //     { label: 'Table', tabTitle: 'Table', isActive: false, componentRef: null },
  //     { label: 'Map', tabTitle: 'Map', isActive: false, componentRef: null }
  //   ];
  //   // Set activeTabIndex to '2D Network' and call updatedVisualization
  //   component.activeTabIndex = 0;
  //   component.updatedVisualization();
  //   expect(commonService.visuals.microbeTrace.publishUpdateVisualization).toHaveBeenCalled();
  //   // No action expected for '2D Network' as it's commented out
  //   // Repeat for other cases
  //   component.activeTabIndex = 1; // PhylogeneticTree
  //   component.updatedVisualization();
  //   expect(commonService.visuals.microbeTrace.publishUpdateVisualization).toHaveBeenCalledTimes(2);
  //   component.activeTabIndex = 2; // Table
  //   component.updatedVisualization();
  //   expect(commonService.visuals.microbeTrace.publishUpdateVisualization).toHaveBeenCalledTimes(3);
  //   component.activeTabIndex = 3; // Map
  //   component.updatedVisualization();
  //   expect(commonService.visuals.microbeTrace.publishUpdateVisualization).toHaveBeenCalledTimes(4);
  // });
  // /// ### 9. Testing getGlobalSettingsData Method
  // it('should populate FieldList and ToolTipFieldList correctly', fakeAsync(() => {
  //   // Spy on commonService.updateThresholdHistogram
  //   spyOn(commonService, 'updateThresholdHistogram').and.callFake(() => {});

  //   // Mock capitalize method to return uppercase labels
  //   spyOn(commonService, 'capitalize').and.callFake((str: string) => str.toUpperCase());

  //   // Define nodeFields and linkFields
  //   commonService.session.data['nodeFields'] = ['node_field1', 'node_field2'];
  //   commonService.session.data['linkFields'] = ['link_field1', 'link_field2'];

  //   // Call getGlobalSettingsData
  //   component.getGlobalSettingsData();

  //   // Assertions
  //   expect(component.FieldList.length).toBe(3); // "None" + two fields
  //   expect(component.FieldList[0]).toEqual({ label: "None", value: "None" });
  //   expect(component.FieldList[1]).toEqual({ label: "NODEFIELD1", value: "node_field1" });
  //   expect(component.FieldList[2]).toEqual({ label: "NODEFIELD2", value: "node_field2" });

  //   expect(component.ToolTipFieldList.length).toBe(3); // "None" + two link fields
  //   expect(component.ToolTipFieldList[0]).toEqual({ label: "None", value: "None" });
  //   expect(component.ToolTipFieldList[1]).toEqual({ label: "LINKFIELD1", value: "link_field1" });
  //   expect(component.ToolTipFieldList[2]).toEqual({ label: "LINKFIELD2", value: "link_field2" });

  //   expect(commonService.updateThresholdHistogram).toHaveBeenCalled();
  // }));

  // /// ### 10. Testing publishLoadNewData Method
  // it('should publish load new data to all active tabs', () => {
  //   // Mock homepageTabs with componentRefs having onLoadNewData
  //   const mockTab1 = { label: 'Tab1', isActive: true, tabTitle: 'Tab1', componentRef: { onLoadNewData: jasmine.createSpy('onLoadNewData') } };
  //   const mockTab2 = { label: 'Tab2', isActive: false, tabTitle: 'Tab2', componentRef: { onLoadNewData: jasmine.createSpy('onLoadNewData') } };
  //   const mockTab3 = { label: 'Tab3', isActive: false, tabTitle: 'Tab3', componentRef: null };
  //   component.homepageTabs = [mockTab1, mockTab2, mockTab3];
  //   component.publishLoadNewData();
  //   expect(mockTab1.componentRef.onLoadNewData).toHaveBeenCalled();
  //   expect(mockTab2.componentRef.onLoadNewData).toHaveBeenCalled();
  //   // Ensure no call for null componentRef
  // });

  // /// ### 11. Testing publishFilterDataChange Method
  // it('should publish filter data change to all active tabs', () => {
  //   // Mock homepageTabs with componentRefs having onFilterDataChange
  //   const mockComponentRef1 = { instance: { onFilterDataChange: jasmine.createSpy('onFilterDataChange') } };
  //   const mockComponentRef2 = { instance: { onFilterDataChange: jasmine.createSpy('onFilterDataChange') } };
  //   const mockTab1 = { label: 'Tab1', isActive: true, tabTitle: 'Tab1', componentRef: mockComponentRef1 };
  //   const mockTab2 = { label: 'Tab2', isActive: false, tabTitle: 'Tab2', componentRef: mockComponentRef2 };
  //   const mockTab3 = { label: 'Tab3', isActive: false, tabTitle: 'Tab3', componentRef: null };
  //   component.homepageTabs = [mockTab1, mockTab2, mockTab3];
  //   component.publishFilterDataChange();
  //   expect(mockComponentRef1.instance.onFilterDataChange).toHaveBeenCalled();
  //   expect(mockComponentRef2.instance.onFilterDataChange).toHaveBeenCalled();
  //   // Ensure no call for null componentRef
  // });

  // /// ### 12. Testing ngOnDestroy Lifecycle Hook
  // it('should call NewSession on ngOnDestroy', () => {
  //   spyOn(component, 'NewSession');
  //   component.ngOnDestroy();
  //   expect(component.NewSession).toHaveBeenCalled();
  // });

  // /// ### 13. Testing onDistanceMetricChanged Method
  // it('should update distance metric and trigger onLinkThresholdChanged when metric is SNPs', () => {
  //   spyOn(component, 'onLinkThresholdChanged');
  //   component.SelectedDistanceMetricVariable = 'SNPs';
  //   component.onDistanceMetricChanged();
  //   expect((commonService.session.style.widgets['default-distance-metric'])).toBe('snps');
  //   expect(component.SelectedLinkThresholdVariable).toBe('7');
  //   expect(component.onLinkThresholdChanged).toHaveBeenCalled();
  //   // Additional jQuery assertions can be added if needed
  // });

  // it('should update distance metric and trigger onLinkThresholdChanged when metric is TN93', () => {
  //   spyOn(component, 'onLinkThresholdChanged');
  //   component.SelectedDistanceMetricVariable = 'TN93';
  //   component.onDistanceMetricChanged();
  //   expect((commonService.session.style.widgets['default-distance-metric'])).toBe('tn93');
  //   expect(component.SelectedLinkThresholdVariable).toBe('0.015');
  //   expect(component.onLinkThresholdChanged).toHaveBeenCalled();
  //   // Additional jQuery assertions can be added if needed
  // });

  // /// ### 14. Testing DisplayUrlDialog Method
  // // it('should handle DisplayUrlDialog with "Open" action correctly', fakeAsync(() => {
  // //   // Mock methods and properties
  // //   spyOn(commonService, 'openAuspiceUrl').and.returnValue(Promise.resolve({
  // //     meta: true,
  // //     tree: {}
  // //   }));
  // //   spyOn(component, 'getAuspiceName').and.returnValue('auspice_import_via_url');
  // //   spyOn(component.homepageTabs[0].componentRef.instance, 'removeAllFiles').and.callThrough();
  // //   spyOn(CommonService.prototype, 'clearData').and.callThrough();
  // //   spyOn(component.homepageTabs[0].componentRef.instance, 'addToTable').and.callThrough();
  // //   spyOn(component.homepageTabs[0].componentRef.instance, 'launchClick').and.callThrough();
  // //   spyOn((window as any), '$').and.returnValue({
  // //     fadeOut: () => { },
  // //     fadeTo: () => { },
  // //     fadeIn: () => { }
  // //   });
  // //   // Set up initial conditions
  // //   component.homepageTabs = [
  // //     { label: 'Files', tabTitle: 'Files', isActive: false, componentRef: { instance: { removeAllFiles: jasmine.createSpy('removeAllFiles'), addToTable: jasmine.createSpy('addToTable'), launchClick: jasmine.createSpy('launchClick') } } }
  // //   ];
  // //   component.activeTabIndex = 0;
  // //   component.displayUrlDialog = false;
  // //   component.auspiceUrlVal = 'http://example.com/auspice';
  // //   // Call DisplayUrlDialog with 'Open'
  // //   component.DisplayUrlDialog('Open');
  // //   tick();
  // //   expect(commonService.openAuspiceUrl).toHaveBeenCalledWith('http://example.com/auspice');
  // //   expect(component.getAuspiceName).toHaveBeenCalledWith('http://example.com/auspice');
  // //   expect(component.homepageTabs[0].componentRef.instance.removeAllFiles).toHaveBeenCalled();
  // //   expect(commonService.clearData).toHaveBeenCalled();
  // //   expect(component.homepageTabs[0].componentRef.instance.addToTable).toHaveBeenCalledWith({ contents: {}, name: 'auspice_import_via_url', extension: 'json' });
  // //   expect(component.homepageTabs[0].isActive).toBeTrue();
  // //   expect(component.homepageTabs[0].componentRef.instance.launchClick).toHaveBeenCalled();
  // //   expect((window as any).$('#overlay').fadeOut).toHaveBeenCalled();
  // //   expect((window as any).$('.ui-tabview-nav').fadeTo).toHaveBeenCalledWith("slow", 1);
  // //   expect((window as any).$('.m-portlet').fadeTo).toHaveBeenCalledWith("slow", 1);
  // //   expect(component.displayUrlDialog).toBeTrue();
  // // }));

  // /// ### 15. Testing ResetTabs Method
  // it('should reset tabs correctly', () => {
  //   // Add mock tabs
  //   const homeTab = { label: 'Files', tabTitle: 'Files', isActive: false, componentRef: null };
  //   const otherTab1 = { label: 'Tab1', tabTitle: 'Tab1', isActive: true, componentRef: null };
  //   const otherTab2 = { label: 'Tab2', tabTitle: 'Tab2', isActive: true, componentRef: null };
  //   component.homepageTabs = [otherTab1, otherTab2, homeTab];
  //   component.activeTabIndex = 2;
  //   // Call ResetTabs
  //   component.ResetTabs();
  //   expect(component.homepageTabs.length).toBe(1);
  //   expect(component.homepageTabs[0]).toBe(homeTab);
  //   expect(homeTab.isActive).toBeTrue();
  //   expect(component.activeTabIndex).toBe(0);
  // });

    // Example test adjustments
    // it('should prepare files list correctly', () => {
    //   // Ensure removeComponent is called when preparing files
    //   component.prepareFilesLists(/* your mock event */);
    //   expect(mockGoldenLayoutHostComponent.removeComponent).toHaveBeenCalledWith(/* expected arguments */);
    // });
  
    // it('should add a new component and initialize it correctly', () => {
    //   component.addComponent('NewComponent');
    //   expect(mockGoldenLayoutHostComponent.newComponent).toHaveBeenCalledWith('NewComponent');
    //   expect(component.homepageTabs.length).toBe(/* expected length */);
    //   expect(component.homepageTabs[/* index */].label).toBe('NewComponent');
    //   // ... other expectations ...
    // });

  /// ### 16. Testing getAuspiceName Method
  // it('should return correct auspice name based on URL', () => {
  //   const url1 = 'http://example.com/path/to/auspice';
  //   const expectedName1 = 'path_to_auspice';
  //   expect(component.getAuspiceName(url1)).toBe(expectedName1);
  //   const url2 = 'auspice_import';
  //   const expectedName2 = 'auspice_import';
  //   expect(component.getAuspiceName(url2)).toBe(expectedName2);
  // });
});



