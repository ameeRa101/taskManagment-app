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
            <i className="fa-solid fa-house" style={{ color: "#05675f" }} />
            <Link to="/">Home</Link>
          </li>
          <li>
            <ul>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <i className="fa-solid fa-user" style={{ color: "#05675f" }} />
                <Link to="/profile">Visit Profile</Link>
              </li>
              <li
                onClick={() => localStorage.removeItem("user")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginLeft: 20,
                }}
              >
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ color: "#05675f" }}
                />
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
