# My API Tester

## Overview

My API Tester is a simple web application designed to help developers test and interact with APIs directly from their browser. It provides an intuitive interface for sending HTTP requests (such as GET, POST, PUT, DELETE) to any API endpoint and viewing the responses in real time.

## Features

- Send HTTP requests to any API endpoint
- Choose request method (GET, POST, PUT, DELETE, etc.)
- Add custom headers and request body

## About This Project

This project is a demonstration of my JavaScript expertise. It showcases my ability to build a functional, user-friendly web application from scratch using modern development tools and best practices. The app is designed to test APIs, but its main purpose is to highlight my skills in front-end development, code organization, and problem-solving.

## Key JavaScript Concepts Used

- **DOM Manipulation:** The app dynamically updates the user interface based on user input and API responses, using vanilla JavaScript to interact with HTML elements.
- **Axios Library:** HTTP requests are sent using the Axios library, which simplifies making asynchronous requests to external APIs and handling responses efficiently. Axios provides a promise-based API and supports features like automatic JSON parsing, error handling, and custom headers.
- **Event Handling:** User actions (such as button clicks and form submissions) are managed with event listeners to provide interactive functionality.
- **Error Handling:** The app gracefully handles errors from failed API requests and invalid user input, providing feedback to the user.
- **Modular Code Structure:** JavaScript code is organized for readability and maintainability, separating concerns between UI logic and API communication.
- **JSON Parsing and Stringifying:** Request bodies and responses are handled as JSON, demonstrating proficiency in working with structured data formats.
- **Responsive UI:** The interface updates in real time based on user actions and API responses, ensuring a smooth user experience.
  index.html # Main HTML file for the app
  main.js # JavaScript logic for API requests and UI interactions
  style.css # CSS styles for the app (located in css/)
  javascript.svg # SVG asset for JavaScript logo
  public/vite.svg # SVG asset for Vite logo
  package.json # Project metadata and dependencies

````

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/OGEmanuel/my-api-tester.git
   cd my-api-tester
````

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the local URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. Enter the API endpoint URL you want to test.
2. Select the HTTP method.
3. Add headers and body data as needed.
4. Click "Send" to make the request.
5. View the response below.

## Technologies Used

- Vite (for development server and build)
- Vanilla JavaScript
- HTML & CSS

## License

This project is licensed under the MIT License.
