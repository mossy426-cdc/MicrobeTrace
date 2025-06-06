# Component Testing Plan for MicrobeTrace

This document outlines test strategies and scenarios for the key components of the application.

## Components in Scope

- **MicrobeTraceNextHomeComponent** – the main wrapper component for the application UI and GoldenLayout host.
- **Common Services (contactTraceCommonServices folder)** – includes `CommonService`, `CommonStoreService`, `FileImportService`, `ExportService`, `ColorMappingService`, and `WorkerComputeService`.
- **FilesComponent** – handles user file uploads and data parsing.
- **TwoDComponent** – renders the 2D network visualization.
- **PhylogeneticComponent** – renders the phylogenetic tree view.

## Testing Approaches

1. **Unit Testing (Jasmine/Karma)**
   - Validate component creation and lifecycle behavior.
   - Mock service dependencies where possible.
   - Verify input/output bindings and DOM rendering.
2. **Integration Testing (Jasmine/Karma)**
   - Test interactions between components and services (e.g., file upload triggering network updates).
3. **End-to-End Testing (Selenium or Cypress)**
   - Automate workflows such as loading files and switching between visualizations.
   - Perform simple visual regressions by capturing screenshots.

## Key Test Scenarios

### MicrobeTraceNextHomeComponent

- Component initializes with a default state and displays the toolbar.
- GoldenLayout correctly hosts visualization components.
- User actions (view menu selections, settings dialogs) update the application state via services.

### Common Services

- `CommonService` manages nodes and links as expected when threshold values change.
- `CommonStoreService` observables emit updates when setters are called.
- `FileImportService` parses CSV/JSON/XLSX files and populates the store.
- `ExportService` generates valid exports (e.g., ZIP, CSV) for current session data.

### FilesComponent

- Uploading supported file types triggers the appropriate parsing logic.
- File validation errors are handled gracefully and communicated to the user.
- Uploaded data appears in the session store and updates relevant visualizations.

### TwoDComponent

- Renders a network based on current nodes and links.
- Updates network visualization when parameters (threshold, layout options) change.
- Emits events for link and node selection.

### PhylogeneticComponent

- Correctly draws a tree from imported data.
- Supports zooming and panning interactions.
- Updates when data or settings change from the common services.

## Test Environment

- **Unit/Integration Tests:** run with `ng test` (Karma + Jasmine).
- **E2E Tests:** use `ng e2e` (Protractor) or an alternative like Cypress.
- **Visual Regression:** optional tools such as BackstopJS for screenshot comparison.

## Coverage Goals

- Aim for 80% code coverage across the listed components and services.
- Critical logic in `CommonService` and `FileImportService` should have thorough unit tests.

