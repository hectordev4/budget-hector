# **BudgetHector**

BudgetHector is a modern Angular-based frontend application designed to help users explore budget offers, review quote details, manage ongoing quotes, and complete user information forms in a streamlined experience.  
The app combines a clean dashboard experience with reusable UI components to make quote and budget workflows easier to understand and interact with.

## **Overview**

BudgetHector focuses on the end-to-end experience of handling a budgeting flow:

* **Browse** available offers  
* **Review** detailed quote information  
* **Track** ongoing quotes  
* **Collect** user input for submission  
* **View** a simple, structured overview of the current budget context

It is built as a single-page application with modular components and a service-oriented structure, making it easy to extend and maintain.

## **Key Features**

* **Responsive Overview Dashboard:** Seamless tracking on any screen size.  
* **Budget Summary Section:** Complete with accessible, localized structural semantics.  
* **Offer Listing & Selection Flow:** Smooth transitions for picking and pricing services.  
* **Ongoing Quote Board:** Keep tabs on live estimates effortlessly.  
* **Quote Detail View:** Deep dives into individual itemized breakdowns.  
* **User Forms:** Clean, reactive input gathering for submissions.  
* **Reusable Shared UI:** Highly modular components like cards and modal dialogs under a unified layout syntax.  
* **Angular Routing:** Organized, decoupled routing architecture.

## **Tech Stack**

BudgetHector is powered by:

* **Framework:** Angular  
* **Language:** TypeScript  
* **Styling:** HTML / CSS / SCSS  
* **Tooling:** Angular CLI  
* **Testing Suite:** Vitest for lightning-fast unit testing

## **Project Structure**

A simplified look at how the workspace is structured:

Plaintext  
src/  
  app/  
    features/  
      banner/  
      overview/  
        components/  
          budget-summary/  
          offer-list/  
          ongoing-board/  
          user-form/  
      quote-detail/  
    models/  
    services/  
    shared/  
      components/  
        generic-card/  
        info-modal/

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed on your machine:

* **Node.js**  
* **npm**

### **Install Dependencies**

Kick off the setup by restoring project dependencies:

Bash  
npm install

### **Run the Development Server**

Spin up the local development instance:

Bash  
ng serve

Then point your browser to:

Plaintext  
http://localhost:4200/

💡 **Pro-Tip:** The application features Hot Module Replacement (HMR)—it will automatically reload your view whenever you modify source files.

## **Available Scripts**

### **Start Development Server**

Bash  
ng serve

### **Build for Production**

Bash  
ng build

### **Run Tests**

Bash  
ng test

## **Development Notes**

The application scales cleanly around a **Feature-Based Architecture**:

* **Isolated Feature Layers:** Feature code lives self-contained inside features/.  
* **Strict UI Decoupling:** Reusable presentation widgets stay safely tucked under shared/components/.  
* **Data Models & Business Logic:** Pure typescript structures and injection tokens reside within models/ and services/.

This setup prevents layout collapses and guarantees that code modifications stay predictable.

## **Testing**

Unit tests are configured to run seamlessly through **Vitest**.  
To run the test suite:

Bash  
ng test

## **Contributing**

Contributions are welcome. If you’d like to improve the app:

1. **Fork** the repository  
2. **Create** a feature branch (git checkout \-b feature/amazing-feature)  
3. **Make** your changes  
4. **Run** your tests (ng test) to ensure everything is green  
5. **Submit** a pull request

## **Future Improvement Ideas**

* **Persistent Storage:** Integrating backend APIs or state management synchronization.  
* **Robust Forms Validation:** Advanced reactive control feedback and comprehensive error diagnostics.  
* **Filtering & Analytics:** Rich filtering capabilities alongside visual charts for budgets.  
* **Accessibility & UX:** Deep audit checking for optimal screen-reader layouts and keyboard-only tracking.

## **Notes**

This project was initially generated with Angular CLI and is currently being developed as a frontend experience for budget and quote workflows.