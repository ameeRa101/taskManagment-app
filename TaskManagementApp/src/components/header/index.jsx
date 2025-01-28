import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <header className="layout-header">
      <nav>
        <ul>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <i class="fa-solid fa-house" style={{ color: "#05675f" }} />
            <Link to="/" state={{ isAuthenticated: true }}>
              Home
            </Link>
          </li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <i class="fa-solid fa-user" style={{ color: "#05675f" }} />
            <Link to="/profile" state={{ isAuthenticated: true }}>
              Visit Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
