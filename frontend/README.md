# Frontend Project

This is the frontend of the Aisel Health application built with Angular. This project provides a modular and scalable frontend structure to manage different features, and it's powered by Angular 19.

## Folder Structure

### **src**

The main source code for the frontend application.

- **app**

  - Contains the application's business logic, UI components, services, and models.
  - **common**
    - Contains shared components, services, and utilities used across the app.
  - **directives**

    - Custom Angular directives providing reusable behavior and UI functionality.

  - **guards**

    - Contains route guards to manage access control to different sections of the app.

  - **interceptors**

    - HTTP interceptors for handling requests and responses, such as adding authorization tokens.

  - **layout**

    - Layout-specific components defining the structure of the app (e.g., header and footer).
    - **components**
      - **footer**: Footer component of the app.
      - **header**: Header component of the app.

  - **modules**

    - Feature modules representing different sections of the app.
    - **home**

      - Main module containing services, models, and UI components for the home section.
      - **models**: Data models used in the home section.
      - **services**: Services related to home functionality.
      - **ui**: UI components for the home section, such as:
        - **modify-patient-form**: Form for modifying patient data.
        - **modify-patient-modal**: Modal for modifying patient data.
        - **patients-list**: List of patients.

    - **login**
      - Module responsible for handling user login functionality.
      - **ui**
        - **login-form**: The login form component.

  - **services**
    - Services shared across modules to handle business logic and data management.

- **environments**
  - Contains configuration files for different environments (e.g., development, production, staging).

## `package.json` Overview

This file contains the dependencies and scripts necessary for building, testing, and serving the application.

### **Scripts**

- **ng**: Runs the Angular CLI.
- **start**: Starts the development server with `ng serve`.
- **build**: Builds the Angular project.

### **Dependencies**

- **@angular/\***: Angular core modules used to build the application.
- **ng-zorro-antd**: UI component library for Angular, providing Ant Design components.
- **jwt-decode**: Library for decoding JWT tokens.
- **ngx-toastr**: Library for showing toasts and notifications.
- **rxjs**: Reactive Extensions for JavaScript for handling asynchronous operations.

### **Dev Dependencies**

- **@angular/cli**: Command line interface for Angular projects.
- **@angular/compiler-cli**: CLI tools for compiling Angular applications.
- **prettier**: Code formatting tool.
- **typescript**: TypeScript language tools for Angular development.

## Getting Started

To get started with the project:

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm start
   ```

   This will start the application at `http://localhost:4200`.

3. **Build the project**:
   - For development build:
     ```bash
     npm run build:dev
     ```
   - For production build:
     ```bash
     npm run build:prod
     ```
