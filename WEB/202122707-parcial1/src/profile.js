import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const state = location.state;
  const profileData = state ? state.profileData : null;

  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [editable, setEditable] = useState(false);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    if (profileData) {
      setProfilePicture(profileData.profilePicture);
      setUsername(profileData.userName);
      setBio(profileData.bio);
      setEditable(Math.random() < 0.5);
    }
  }, [profileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Bio:', bio);
    console.log('Profile picture:', profilePicture);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'spanish' : 'english');
  };

  const renderProfileInfo = () => {
    if (editable) {
      return (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="username">{language === 'english' ? 'Username' : 'Nombre de usuario'}:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">{language === 'english' ? 'Bio' : 'Biografía'}:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
            ></textarea>
          </div>
          <button type="submit">{language === 'english' ? 'Save' : 'Guardar'}</button>
        </form>
      );
    } else {
      return (
        <div className="profile-info">
          <p>{language === 'english' ? `Username: ${username}` : `Nombre de usuario: ${username}`}</p>
          <p>{language === 'english' ? `Bio: ${bio}` : `Biografía: ${bio}`}</p>
        </div>
      );
    }
  };

  return (
    <div className="profile-page">
      <br />
      {/* Display profile picture */}
      <div className="profile-info">
        <img
          src={profilePicture}
          alt="Profile"
          className="profile-picture"
          style={{ display: "block", margin: "auto" }}
        />
      </div>
      {/* Render editable or non-editable profile info */}
      {renderProfileInfo()}
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === "english" ? "Español" : "English"}
      </button>
      <br />
      <a href="/">
        {language === "english" ? "Back to Home" : "Regresar al Inicio"}
      </a>
    </div>
  );
};

export default ProfilePage;