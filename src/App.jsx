import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/login_sign/Login";
import Signup from "./pages/login_sign/Signup";
import Test from './pages/Test';
import AdminPage from './pages/admin/AdminPage';
import Main from './pages/main/Main';
import RecruitmentList from './pages/recruitment/RecruitmentList';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('accessToken'));

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!sessionStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="app">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="app_content">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={isAuthenticated ? <Main /> : <Navigate to="/login" />} />
          <Route path="/recruitments" element={isAuthenticated ? <RecruitmentList /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAuthenticated ? <AdminPage/> : <Navigate to="/login" />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
