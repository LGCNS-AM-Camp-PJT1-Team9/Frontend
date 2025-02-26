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
import Company from './pages/company/Company';
import CompanyDetail from './pages/company_detail/CompanyDetail';
import CompanyNews from './pages/company_detail/CompanyNews';

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

          {/* 기업 정보 조회 페이지 */}
          <Route path="/company" element={<Company />} />

          {/* 기업 상세 정보 페이지 */}
          <Route path="/company/:companyId" element={<CompanyDetail />} />

          {/* 기업 뉴스 페이지 */}
          <Route path="/company/:companyId/news" element={<CompanyNews />} />
          
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