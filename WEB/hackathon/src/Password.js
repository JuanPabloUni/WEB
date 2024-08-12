import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

    useEffect(() => {
        handleGeneratePassword();
    }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars]);

  const handleGeneratePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecialChars) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  return (
    <div>

      <div>
        <h3>Generated Password:</h3>
        <p>{generatedPassword}</p>
      </div>

      <Button variant="primary" onClick={handleGeneratePassword}>
        Generate Password
      </Button>

      {generatedPassword && (
        <Button variant="secondary" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </Button>
      )}

      <Form.Group controlId="formPasswordLength">
        <Form.Label>Password Length: {passwordLength}</Form.Label>
        <Form.Control
          type="range"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          min={4}
          max={20}
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Include Uppercase"
        checked={includeUppercase}
        onChange={(e) => setIncludeUppercase(e.target.checked)}
      />

      <Form.Check
        type="checkbox"
        label="Include Lowercase"
        checked={includeLowercase}
        onChange={(e) => setIncludeLowercase(e.target.checked)}
      />

      <Form.Check
        type="checkbox"
        label="Include Numbers"
        checked={includeNumbers}
        onChange={(e) => setIncludeNumbers(e.target.checked)}
      />

      <Form.Check
        type="checkbox"
        label="Include Special Characters"
        checked={includeSpecialChars}
        onChange={(e) => setIncludeSpecialChars(e.target.checked)}
      />
    </div>
  );
}

export default PasswordGenerator;
