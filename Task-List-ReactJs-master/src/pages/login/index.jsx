import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // this is for disabling buttons while sending an api request to prevent sending multiple requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await axios.get(
        "https://dummyjson.com/users?limit=3&select=username,email,password"
      );

      const user = response.data.users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? <i className="fa-solid fa-circle-notch" /> : "Login"}
        </button>
        <Link to="/signup">
          <div style={{ marginTop: 20 }}>Don't have an account? Sign Up</div>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
