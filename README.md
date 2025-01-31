 Task Management Application
## Project Overview
The Task Management Application is a simple ReactJS application that allows users to create, read, update, and delete tasks. The application features user authentication, task filtering and sorting, search functionality, user profile management, and a responsive design. Additionally, optional features such as task prioritization and task descreption and due date are included for better functionality.

This project uses mock data from jsonexamples.com to manage tasks and user profiles.
## Features
User Authentication: Simulated user registration and login using mock data from jsonexamples.com.
Task Management: Users can create, update, delete, and mark tasks as completed.
Task Filtering & Sorting: Filter tasks based on due date and status.
Search Functionality: Users can search tasks by title.
Responsive Design: The app is designed to work on both desktop and mobile screens.
Technologies Used
Frontend: ReactJS, React Router, Tailwind CSS State Management: React Hooks (useState, useEffect) Data Source: Mock data from jsonexamples.com


## Folder Structure

```
Task-List-ReactJs-master/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── component-folder/
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   └── ...other-components.jsx
│   ├── guards/
│   │   ├── auth-guards.jsx
│   ├── pages/
|   |   ├── page-folder/
|   |   |   ├── index.jsx
|   |   |   ├── file.css
|   |   └── ...other-pages
│   ├── App.js
│   ├── routes.jsx
│   └── ...
├── README.md
└── ...
```

## The last updates I made

1. Restructured the project files to improve organization and maintainability.
2. Added `react-router-dom` for handling routing within the application.
   Because react doesn't have a built-in method to hanlde routing, we need an external tool or package, and the most famous one for react is the `react-router-dom` library.
   This allows for navigation between different pages of the application without reloading the entire page, providing a smoother user experience.
3. Added Routes:
   1. /Signup
   2. /Login
   3. /Profile
4. Added Features:
   1. Search Functionality
   2. Responsive Design
   3. Task Filtering & Sorting: Filter tasks based on due date (e.g., “All Dates”, “Due Today”, “Overdue”, “Upcoming”, “Next Week”) and status (completed, pending).
4. replace localStorage for storing tasks with mock data from jsonexamples.com by calling different endpoints
5. I added react-toastify for displaying notifications

## Understand src/routes.jsx

- This file defines the routing configuration for the application using React Router.
- It sets up the different routes and their corresponding components, allowing for
- navigation between different routes within the app. Each route is associated with
- a specific path and component, enabling the application to render the appropriate
- content based on the URL.

- Key Concepts:

  - React Router: A library for handling routing in React applications.
  - Routes: Define the mapping between URL paths and React components.
  - Navigation: Allows users to move between different parts of the application.

- Usage:
  - Import this file in the main application file, "App.jsx" to enable routing.
  - Define additional routes as needed to expand the application's navigation.

## Understand src/guards/auth-guard.jsx

- AuthGuard component

- This component acts as a guard for routes that require authentication.
- It checks if the user is authenticated by check is there a "user" item in localStorage
- If the user is not authenticated, it redirects them to the login page.
- If the user is authenticated, it renders the child components.

## Best Practice

1. In responsive design, Always start with mobile first, and in media queries add code for larger screens, example `@media (min-width: 640px)`

## Getting Started

To get started with this project, just install the dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

To start the development server, run:

```bash
npm run start
```

or

```bash
pnpm run start
```
