import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../../components/common/Title";
import PurpleBtn from "../../../components/common/PurpleBtn";
import { InputLabel } from "../../../components/common/InputLabel";
import defaultProfile from "../../../assets/images/Defalt_Profile_Image.png";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    profilePicture: null,
    password: "",
    passwordConfirm: "",
  });

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [profileError, setProfileError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const accessToken = sessionStorage.getItem("accessToken");

  // 비밀번호 정규식 패턴 (최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  // 내 정보 조회 (GET /api/profile)
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8072/jobbotdari-user/api/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { name, username, file } = response.data.data;
      setProfileData({ name, username, profilePicture: file });

      // 파일 URL 가공하여 이미지 표시
      if (file) {
        setPreview(`http://localhost:8072/jobbotdari-user/api/files/${file.split("/").pop()}`);
      } else {
        setPreview(defaultProfile);
      }
      
      setProfileError(null);
    } catch (err) {
      console.error("내 정보 조회 실패:", err);
      setProfileError("내 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accessToken]);

  // 입력값 변경 핸들러
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    // 에러 초기화
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // 비밀번호 검증
    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setErrors((prevErrors) => ({ 
          ...prevErrors, 
          password: "비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다." 
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }

    // 비밀번호 확인 검증
    if (name === "passwordConfirm") {
      if (value !== profileData.password) {
        setErrors((prevErrors) => ({ 
          ...prevErrors, 
          passwordConfirm: "비밀번호가 일치하지 않습니다." 
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "" }));
      }
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });

    if (file) {
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    } else {
      setFileName("");
      setPreview(defaultProfile);
    }
  };

  // 프로필 업데이트 요청 (PATCH /api/profile)
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const { name, password, passwordConfirm, profilePicture } = profileData;
    const profileDataToSend = new FormData();
    const requestDto = {};

    // 입력된 값만 요청에 추가
    if (name) requestDto.name = name;
    if (password && passwordConfirm) {
      if (!passwordRegex.test(password)) {
        setErrors({ password: "비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다." });
        return;
      }
      if (password !== passwordConfirm) {
        setErrors({ passwordConfirm: "비밀번호가 일치하지 않습니다." });
        return;
      }
      requestDto.password = password;
      requestDto.passwordConfirm = passwordConfirm;
    }

    if (Object.keys(requestDto).length > 0) {
      profileDataToSend.append("requestDto", new Blob([JSON.stringify(requestDto)], { type: "application/json" }));
    }

    if (profilePicture) {
      profileDataToSend.append("file", profilePicture);
    }

    try {
      await axios.patch("http://localhost:8072/jobbotdari-user/api/profile", profileDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
      });

      alert("프로필이 수정되었습니다.");
      fetchProfile(); // 최신 정보 반영
      setProfileData((prev) => ({ ...prev, password: "", passwordConfirm: "" })); // 비밀번호 필드 초기화
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <div className="profile-container">
      <Title mainTitle="회원 정보 조회/수정" subTitle="수정하고 싶은 곳이 있으면, 변경 후 저장해 주세요!" />

      <div className="profile-wrapper">
        {/* 프로필 폼 */}
        <div className="profile-form-container">
          {loading ? (
            <p className="loading">불러오는 중...</p>
          ) : profileError ? (
            <p className="error-message">{profileError}</p>
          ) : (
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="display-flex">
                <InputLabel 
                  label="이름" 
                  name="name" 
                  placeholder="이름을 입력해주세요" 
                  value={profileData.name} 
                  onChange={handleProfileChange}
                />
              </div>

              <div className="display-flex">
                <div>
                  <InputLabel label="비밀번호 변경" name="password" type="password" placeholder="새 비밀번호 입력" value={profileData.password} onChange={handleProfileChange} />
                  {errors.password && <p className="input_error_message">{errors.password}</p>}
                </div>
                <div>
                  <InputLabel label="비밀번호 확인" name="passwordConfirm" type="password" placeholder="비밀번호 확인" value={profileData.passwordConfirm || ""} onChange={handleProfileChange} />
                  {errors.passwordConfirm && <p className="input_error_message">{errors.passwordConfirm}</p>}
                </div>
              </div>

              <InputLabel label="프로필 사진" name="profilePicture" type="file" placeholder="파일 이름" value={fileName} onFileChange={handleFileChange} />

              <PurpleBtn text="수정하기" type="submit" />
            </form>
          )}
        </div>

        {/* 프로필 사진 */}
        <div className="profile-image-container">
          <img src={preview} alt="프로필 미리보기" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
