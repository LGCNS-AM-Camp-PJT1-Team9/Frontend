import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/login_sign/Login";
import Signup from "./pages/login_sign/Signup";
import { Navigate } from 'react-router-dom';
import Test from './pages/Test';
import Main from './pages/main/Main';
import RecruitmentList from './pages/recruitment/RecruitmentList';

export default function App() {
  // 로그인 여부
  const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <div className="app">
      <Header />
      <main className="app_content">
        <Routes>
          {/*로그인, 회원가입*/}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          {/*메인, 만약 로그인 하지 않았으면, /login으로 이동*/}
          <Route path="/" element={isAuthenticated ? <Main /> : <Navigate to="/login" />}/> 

          {/* 채용 공고 목록 페이지 */}
          <Route path="/recruitments" element={<RecruitmentList />} />

          {/* 컴포넌트 테스트용 */}
          <Route path="/test" element={<Test/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}