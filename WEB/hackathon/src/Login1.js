import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation if needed
    navigate('/login/password', { state: { email } }); // Navigate to the password route and pass the email as state
  };

  return (
    <div class="login">
      <h2>Enter Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default EmailForm;