import React, { useState } from "react";
import axios from "axios";
import Title from "../../components/common/Title";
import "./Signup.css";
import { InputLabel } from "../../components/common/InputLabel";
import defatultProfile from "../../assets/images/Defalt_Profile_Image.png";
import PurpleBtn from "../../components/common/PurpleBtn";

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

        // JSON 문자열로 변환 후 Blob으로 추가
        const signupRequestDto = {
            name: name,
            username: username,
            password: password,
            passwordConfirm: passwordConfirm
        };

        formDataToSend.append(
            "signupRequestDto",
            new Blob([JSON.stringify(signupRequestDto)], { type: "application/json" })
        );

        if (formData.profilePicture) {
            formDataToSend.append("profilePicture", formData.profilePicture);
        }

        try {
            //서버로 POST 요청 전송
            const response = await axios.post("http://localhost:8072/jobbotdari-user/api/auth/signup", formDataToSend, {
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
                    <div className="display_flex">
                        <InputLabel
                            label="이름"
                            name="name"
                            placeholder="이름을 입력해주세요"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <InputLabel
                            label="아이디"
                            name="username"
                            placeholder="아이디를 입력해주세요"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="display_flex">
                        <InputLabel
                            label="비밀번호"
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={formData.password}
                            onChange={handleChange}

                        />
                        <InputLabel
                            label="비밀번호 확인"
                            name="passwordConfirm"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                        />
                    </div>
                    <InputLabel
                        label="프로필 사진"
                        name="profilePicture"
                        type="file"
                        placeholder="파일 이름"
                        value={fileName}
                        onFileChange={handleFileChange}
                    />
                    
                    <PurpleBtn text="회원가입" type="submit" width="100%"/>
                </form>
                {/* 프로필 사진 미리보기 섹션 */}
                <div className="signup_profile" style={{ marginTop: "20px" }}>
                    <img
                        src={preview || defatultProfile}
                        alt="미리보기"
                    />
                </div>
            </div>
        </div>
    );
}
