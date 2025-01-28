import React, { useState } from "react";
import "./index.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "ameeRa alorf",
    email: "ameera.alorf@gmail.com",
  });

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    setIsEditing(false);
  };

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
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
