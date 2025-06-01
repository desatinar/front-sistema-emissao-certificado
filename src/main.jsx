import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import Students from './pages/Students/index.jsx';
import Certificates from './pages/Certificates/index.jsx';
import Courses from './pages/Courses/index.jsx';
import Home from './pages/Home/index.jsx';
import Admin from './pages/Admin/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login/>} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="alunos" element={<Students />}/>
        <Route path="certificados" element={<Certificates />}/>
        <Route path="cursos" element={<Courses />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
