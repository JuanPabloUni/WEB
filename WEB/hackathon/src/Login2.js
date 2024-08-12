import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const location = useLocation();
  const email = location.state && location.state.email; // Access the email from location state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any authentication or validation if needed
    console.log('Email:', email);
    console.log('Password:', password);
    // Redirect user to a different route after authentication
    // history.push('/dashboard');
  };

  return (
    <div className="login">
      <h2>{email && <p>{email}</p>}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default PasswordForm;