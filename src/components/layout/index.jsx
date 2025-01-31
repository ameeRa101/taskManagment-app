import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/index";
import "./index.css";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        {/* 
          this Outlet file is the component assosiated with the matching the current route when have the same layout,
          it's like a placeholder for the nested routes,
          for example, in the routes.jsx file we have the following route ("/", "profile") share the same layout:
          {
            element: (
              <AuthGuard>
                <Layout />
              </AuthGuard>
            ),
            children: [
              {
                path: "/",
                element: <Home />,
                index: true,
              },
              {
                path: "profile",
                element: <Profile />,
              },
            ],
          },
          when we navigate to the /profile route, the Layout component will be rendered and the Outlet component will be replaced by the Profile component
        */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
