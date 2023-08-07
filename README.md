# Invoicing App

## How to Run

Follow these steps to run the application:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Run the mock backend server: `npm run mock-api`.
5. Run the application: `npm run dev`.
6. Open your web browser and visit `http://localhost:5173/` to access the application.
7. Run Test case: `npm run test`.

## Development Process and Approach

1. Requirement Analysis, UI Design and data structures design: 1 hour
2. Tool Selection and Project Setup: 1.5 hours
3. Development: implemented features, components, and logic: 6 hours
4. Testing: Wrote Testcases & Conducted Manual Testing: 0.5 hour

Given more time, I would have focused on:
- Implementing an in-grid function in the invoice item table, allowing users to update invoice items.
- Creating a function to generate an invoice PDF/Word document and send it via email.
- Implementing view and delete invoice functions.
- Designing a proper home page for users to navigate to other modules, such as the invoice section.

I might have also invested more time in:
- Handling invoice statuses, such as setting the status to "sent" after a user sends it via email or marking it as "outstanding" if the due date has passed on the backend. However it may more suitable to implement the logic in backend.
- Creating more comprehensive test cases, with a focus on edge cases such as handling null exceptions.
- Polishing the user interface.

## Frameworks/Libraries/Tools I Chose


- TypeScript: Offers benefits such as static typing compared to JavaScript.
- React: My most familiar frontend framework (technically a library).
- Vite: Provides faster server start time.
- ESLint: A linting tool to avoid potential bugs.
- Material UI: A powerful UI library that's suitable for building applications quickly.
- React Hook Form: Used to build forms in React. Reduced code needed to handle form and reduce unnecessary re-renders.
- React Router: Used for page routing.
- Axios: Utilized for making API calls.
- Vite + React Testing Library: Works seamlessly with Vite for testing.
- JSON Server: Used for local mock backend server.
- Visual Studio Code: Chosen as the familiar code editor.
- ChatGPT + Copilot: Used to save time on redundant tasks.

## Relevant Logic in the Code

- [Invoice Item Table](./src/components/Invoice/InvoiceItemTable.tsx): A reusable invoice item table, used in InvoiceTable and Invoice Detail. The setInvoiceItems setter enables rendering UI for adding invoice items.
- [Invoice Interface](./src/interface/IInvoice.tsx): This interface file and shared variable file define the data structure for storing invoices and invoice items. They are referenced in every invoice-related file to ensure strict typing.
- [Invoice Service](./src/services/InvoiceService.tsx): A service file that provides reusable services related to invoices.

## Design Decisions and Assumptions


- **Only Two Types of Invoice Items**: Assumed that supporting only two types of invoice items is sufficient for now.
- **Invoice Item Amount Calculation**: Assumed that the amount for all invoice items could be calculated as quantity * rate, with a flat rate for each item.
- **User Can Create Invoice with NO Items**: Assumed that users might prefer to create invoices as drafts and add items later.
- **Billing Address is Email Address**: Assumed that the billing address is an email address, which could be used for sending emails.
- **Future Implementation of Pagination and Filtering**: Assumed that future requirements might involve integrating pagination and filtering functionality in the table.
- **Loose Data Validation**: Chose a loose data validation approach since different industries might have varying standards for invoices. A more flexible validation approach was used for now.

