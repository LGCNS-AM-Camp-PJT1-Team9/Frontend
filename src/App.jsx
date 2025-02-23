import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/login_sign/Login";
import Signup from "./pages/login_sign/Signup";

export default function App() {
  //const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <div className="app">
      <Header />
      <main className="app_content">
        <Routes>
          {/*로그인, 회원가입*/}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          {/*<Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}/> */} 
        </Routes>
      </main>
      <Footer />
    </div>
  )
}