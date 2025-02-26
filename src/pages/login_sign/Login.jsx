import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../../components/common/Title";
import logo from '../../assets/images/Logo_mini.png';  
import './Login.css';
import { InputLabel } from "../../components/common/InputLabel";
import PurpleBtn from "../../components/common/PurpleBtn";

export default function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 요청 시작:", credentials);

    try {
      const response = await axios.post("http://localhost:8072/jobbotdari-user/api/auth/signin", credentials, {
        headers: { "Content-Type": "application/json" }
      });
      const { accessTokenm userRole } = response.data.data;

      sessionStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      alert("로그인 성공!");
      
      if (userRole == 'USER') {
        navigate("/"); // 홈 페이지로 이동
      } else {
        navigate("/admin"); // 관리자 페이지로 이동 
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login_container">
        <div className="app_discription">
            <span>"당신의 취업 여정을 돕는 AI 파트너"</span>
            <img src={logo} alt="Logo" className="logo"/>
            <p>AI 기술로 최신 뉴스와 채용 정보를 분석해<br/>
                취업 준비생과 구직자에게 맞춤형 정보를 제공합니다. <br/>
                취업봇다리와 함께, 가능성의 다리를 건너보세요. <br/><br/>
                "취업의 보따리를 풀어드립니다. 지금 시작하세요!"
            </p>
        </div>
        <div className="login_form_container">
            <Title mainTitle="로그인"/>
            <div className="login_form_wrapper">
                <form className="login_form" onSubmit={handleSubmit}>
                    <InputLabel
                        name="username"
                        placeholder="아이디를 입력해주세요"
                        value={credentials.username}
                        onChange={handleChange}
                        backgroundColor="white"
                    />
                    <InputLabel
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={credentials.password}
                        onChange={handleChange}
                        backgroundColor="white"
                    />
                    <PurpleBtn text="로그인" type="submit" width="100%"/>
                </form>
                <div className="goto_signup" onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
                    아직 회원가입을 안 하셨나요? 회원가입 바로가기
                </div>
            </div>
        </div>
    </div>
  );
}
