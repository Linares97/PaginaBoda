import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing.jsx';
import Civil from './pages/Civil.jsx';
import Admin from './pages/Admin.jsx';

// Los ~74 links ya enviados apuntan a /rsvp/:code; los reenviamos a la invitación
// unificada en /i/:code sin romperlos.
function RsvpLegacyRedirect() {
  const { code } = useParams();
  return <Navigate to={`/i/${code}#confirmar`} replace />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/i/:code" element={<Landing />} />
        <Route path="/civil" element={<Civil />} />
        <Route path="/rsvp" element={<Navigate to="/" replace />} />
        <Route path="/rsvp/:code" element={<RsvpLegacyRedirect />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
