# Invoicing App

## How to Run

Follow these steps to run the application:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Run the mock backend server: `npm run mock-api`.
5. Run the application: `npm run dev`.
6. Open your web browser and visit `http://localhost:5173/invoice` to access the application.


## Frameworks/Libraries/Tools I Chose


- TypeScript: Offers benefits such as static typing compare to JavaScript.
- React: My most familiar frontend framework (technically a library).
- Vite: Provides faster server start time.
- ESLint: A linting tool to avoid potential bugs.
- Material UI: A powerful UI library that's suitable for building applications quickly.
- React-chartjs-2: UI library for building charts using Chart.js within React.
- React Hook Form: Used to build forms in React. Reduced code needed to handle form and reduce unnecessary re-renders.
- React Router: Used for page routing.
- Axios: Utilized for making API calls.
- Vitest + React Testing Library: Works seamlessly with Vite for testing.
- JSON Server: Used for local mock backend server.
- Visual Studio Code: Chosen as the familiar code editor.
- ChatGPT + Copilot: Used to save time on redundant tasks.

## Special functionalities Implemented
**Invoice Data Visualization** component for visualiaze invoice-related information. This includes two doughnut charts illustrating the distribution of invoice item types and invoices requiring shipment. A line chart to depict the distribution of invoice amounts over months based on both invoice date and due date. This is displayed on the invoice section's entry page, so when a user is using the invoice section, they will be able to see a big picture of what's going on

## Relevant File/Logic in the Code
- [Invoice Data Visualization](./src/components/Invoice/InvoiceDataVisualization.tsx): An invoice data visualization component, comprising multiple charts built using React-chartjs-2.
- [Invoice Service](./src/services/InvoiceService.tsx): A service file that provides reusable services related to invoices. Also, prepare summarized data for visualization component to display, such as invoices amount by month.
- [Invoice Item Table](./src/components/Invoice/InvoiceItemTable.tsx): A reusable invoice item table, used in InvoiceTable and Invoice Detail. The setInvoiceItems setter enables rendering UI for adding invoice items.
- [Invoice Interface](./src/interface/IInvoice.tsx): This interface file and shared variable file define the data structure for storing invoices and invoice items. They are referenced in every invoice-related file to ensure strict typing.

## Design Decisions and Assumptions

- **Only Two Types of Invoice Items**: Assumed that supporting only two types of invoice items is sufficient for now.
- **Invoice Item Amount Calculation**: Assumed that the amount for all invoice items could be calculated as quantity * rate, with a flat rate for each item.
- **User Can Create Invoice with NO Items**: Assumed that users might prefer to create invoices as drafts and add items later.
- **Billing Address is Email Address**: Assumed that the billing address is an email address, which could be used for sending emails.
- **Future Implementation of Pagination and Filtering**: Assumed that future requirements might involve integrating pagination and filtering functionality in the table.
- **Invoice status handled backend**: Assumed that all invoice statuses were handled in the backend job scheduler since invoice status could change depending on the invoice's due date and time.
- **Loose Data Validation**: Choose a loose data validation approach since different industries might have varying standards for invoices. A more flexible validation approach was used for now.

