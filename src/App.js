import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './scenes/Login';
import Dashboard from './scenes/dashboard/Dashboard';
import Topbar from './scenes/global/Topbar';

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
