import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing.jsx';
import Civil from './pages/Civil.jsx';
import Rsvp from './pages/Rsvp.jsx';
import Admin from './pages/Admin.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/civil" element={<Civil />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/rsvp/:code" element={<Rsvp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
