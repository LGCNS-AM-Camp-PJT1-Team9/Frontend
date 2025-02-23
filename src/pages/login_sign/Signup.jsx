import React, { useState } from "react";
import axios from "axios";
import Title from "../../components/Title";
import "./Signup.css";

export default function Signup() {
    // 사용자가 입력한 formData 상태 관리
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        passwordConfirm: "",
        profilePicture: null, // 프로필 사진 파일
    });

    const [preview, setPreview] = useState(null); // 미리보기 URL 상태
    const [fileName, setFileName] = useState(""); // 파일 이름 상태

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });

        // 파일이 선택되었을 때 파일 이름과 미리보기 URL 생성
        if (file) {
            setFileName(file.name); // 파일 이름 설정
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setFileName(""); // 파일 이름 초기화
            setPreview(null); // 미리보기 초기화
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, password, passwordConfirm } = formData;

        // 간단한 유효성 검사
        if (!name || !username || !password || !passwordConfirm) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 서버에 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        formDataToSend.append("name", name);
        formDataToSend.append("username", username);
        formDataToSend.append("password", password);
        if (formData.profilePicture) {
            formDataToSend.append("profilePicture", formData.profilePicture);
        }

        try {
            //서버로 POST 요청 전송
            const response = await axios.post("http://localhost:8080/api/auth/signup", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("회원가입 성공!");
            } else {
                alert(response.data.message || "회원가입 실패");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "서버와 통신 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="signup_form_container">
            <Title mainTitle="Sign Up"/>
            <div className="signup_form_wrapper">
                <form className="signup_form" onSubmit={handleSubmit}>
                    <label className="signup_label" htmlFor="name">이름</label>
                    <input
                        className="signup_input_short"
                        name="name"
                        placeholder="이름을 입력해주세요"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label className="signup_label" htmlFor="username">아이디</label>
                    <input
                        className="signup_input_short"
                        name="username"
                        placeholder="아이디를 입력해주세요"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label className="signup_label" htmlFor="password">비밀번호</label>
                    <input
                        className="signup_input_short"
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label className="signup_label" htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        className="signup_input_short"
                        name="passwordConfirm"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                    />
                    <label className="signup_label" >프로필 사진</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        {/* 파일 이름을 보여주는 인풋 박스 */}
                        <input
                            className="signup_input_long"
                            type="text"
                            placeholder="파일 이름"
                            value={fileName}
                            readOnly
                        />
                        {/* 파일 선택 버튼 */}
                        <label className="signup_profile_select" htmlFor="profilePicture"> 파일 선택 </label>
                        <input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }} // 숨겨진 파일 입력 필드
                        />

                    </div>
                    
                    <button className="signup_button" type="submit" style={{ marginTop: "20px" }}>회원가입</button>
                </form>
                {/* 프로필 사진 미리보기 섹션 */}
                {preview && (
                    <div className="signup_profile" style={{ marginTop: "20px" }}>
                        <img
                            src={preview}
                            alt="미리보기"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
