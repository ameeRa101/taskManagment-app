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

## The updates I made

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
- It checks if the user is authenticated using the `useAuth` hook.
- If the user is not authenticated, it redirects them to the login page.
- If the user is authenticated, it renders the child components.

- In my case I check if the route has a state {isAuthenticated: true} is passed when navigate to that route, we use either:
  - `navigate("/", { state: { isAuthenticated: true } });` which is function returned from useNavigate from react-router-dom.
  - Link component from react-router dom, example: `<Link to="/profile" state={{ isAuthenticated: true }}>...`
- if we didn't passed `state: { isAuthenticated: true }` the guard will redirect us to /login

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
