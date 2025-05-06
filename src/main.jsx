import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login/index.jsx';
import Signup from './pages/Signup/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}/>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
