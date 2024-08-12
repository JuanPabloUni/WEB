import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Profile from './profile';

const App = () => {
  return (
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="*" element={<Home />} />
       </Routes>
  );
};

export default App;