import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", credentials);
      const { accessToken } = response.data.data; // response.data와 response.data.data 중 어느것이 맞을까

      // 로그인 성공 시 토큰 저장 및 페이지 이동
      localStorage.setItem("accessToken", accessToken); // JWT 토큰 저장
      alert("로그인 성공!");
      navigate("/"); // 홈 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <>
      <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="아이디를 입력해주세요"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">로그인</button>
        </form>
        <p onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue" }}>
          아직 회원가입을 안 하셨나요? 회원가입 바로가기
        </p>
      </div>
    </>
  );
}
