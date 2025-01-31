import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./pages/signup/index";
import Home from "./pages/home/index";
import Profile from "./pages/profile/index";
import NotFound from "./pages/not-found/index";
import Login from "./pages/login/index";
import AuthGuard from "./guards/auth-guard";
import Layout from "./components/layout/index";

// Define the route object
// to use the route object, we need to use the createBrowserRouter function from the react-router-dom package
// the createBrowserRouter function accepts an array of route objects
// each route object has the following properties:
// - element: the component to render when the route is matched
// - children: an array of nested route objects if the route has nested routes
// - path: the path of the route
// - index: a boolean to indicate if the route is the index route
// the "/" and "profile" routes share the same layout, so we wrap them with the Layout component
// the "login" and "signup" routes don't share the same layout, so we don't wrap them with the Layout component
// the "*" is matched when no other route is matched

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // AuthGuard is a custom guard component to protect the routes
      // it checks if the user is authenticated, if not, it redirects the user to the login page
      // if the user is authenticated, it renders the Layout component
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        element: <Home />,
        // we pass index: true to the route object to indicate that this route is the default route when visite the parent route "/"
        index: true,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Component to use the route object
const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
