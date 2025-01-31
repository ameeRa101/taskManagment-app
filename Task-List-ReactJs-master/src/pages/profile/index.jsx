import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Get the user name from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    name: user ? user.username : "",
    email: user ? user.email : "",
  });
  // this is for disabling buttons while sending an api request to prevent sending multiple requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (profile.name.trim() === "" || profile.email.trim() === "") {
      toast.error("Name and email cannot be empty");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setIsSubmitting(true);
      await axios.put(`https://dummyjson.com/users/${user.id}`, {
        username: user.username,
        email: profile.email,
      });
      user.username = profile.name;
      user.email = profile.email;
      // Update the user name in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsSubmitting(false);
  };

  // Redirect to login page if user is not in localStorage
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="item">
        <label>
          <b>{"Name: "}</b>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </label>
      </div>
      <div className="item">
        <label>
          <b>{"Email: "}</b>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </label>
      </div>
      {isEditing ? (
        <button disabled={isSubmitting} onClick={handleSave}>
          {isSubmitting ? <i className="fa-solid fa-circle-notch" /> : "Save"}
        </button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
