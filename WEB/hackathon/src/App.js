import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login1 from './Login1';
import Login2 from './Login2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login/email" />} />
        <Route path="/login/email" element={<Login1 />} />
        <Route path="/login/password" element={<Login2 />} />
        <Route path="*" element={<Navigate to="/login/email" />} />
      </Routes>
    </Router>
  );
};

export default App;