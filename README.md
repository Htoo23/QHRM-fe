Product Management Frontend
This is a React.js application for managing products, featuring a responsive design with Tailwind CSS and Material-UI (MUI) components for tables and icons. It integrates with a .NET Core Web API backend.

Features
Display a list of products in an MUI Table.

Add new products via a modal form.

Edit existing products via a modal form.

Delete products.

Responsive layout for various screen sizes.

Integration with a .NET Core API.

Prerequisites
Node.js (LTS version recommended)

npm or yarn (package manager)

A running .NET Core Web API backend (configured to listen on https://localhost:7142/api/Products)

Installation
Clone this repository (or create a new React app and copy the src folder content).



Install dependencies:

npm install
# or
# yarn install

Install Material-UI specific dependencies:

npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
# or
# yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material

Running the Application
Ensure your .NET Core Web API backend is running on https://localhost:7142.

Start the React development server:

npm start
# or
# yarn start

This will open the application in your browser, usually at http://localhost:3000.

Project Structure
product-management-frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js             // Main application component
│   ├── index.js           // React entry point
│   ├── components/        // Reusable UI components
│   │   ├── ProductFormModal.js
│   │   ├── ProductTable.js
│   │   └── common/
│   │       ├── Button.js
│   │       ├── Input.js
│   │       └── Modal.js
│   ├── services/
│   │   └── ProductService.js // Handles API calls
│   └── utils/
│       └── formatDate.js    // Utility function
├── package.json
├── README.md
└── .gitignore

Technologies Used
Frontend: React.js

UI Framework: Material-UI (MUI), Tailwind CSS

API Calls: Fetch API (JavaScript built-in)

Backend: .NET Core Web API (expected, not included in this repo)
