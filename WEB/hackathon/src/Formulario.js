import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function UserForm() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if any of the fields are empty
    if (!username || !fullName || !age) {
      alert('Please fill in all fields');
      return;
    }
    // Store the submitted data
    const data = {
      username,
      fullName,
      age
    };
    setSubmittedData(data);
  };

  const isFormValid = username && fullName && age;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Form>

      {submittedData && (
        <div>
          <h2>User Info</h2>
          <p>Username: {submittedData.username}</p>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Age: {submittedData.age}</p>
        </div>
      )}
    </div>
  );
}

export default UserForm;