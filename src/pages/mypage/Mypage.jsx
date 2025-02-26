import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/common/Title";

const MyPage = () => {
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

  const accessToken = sessionStorage.getItem("accessToken");

  // 내 정보 조회
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8072/jobbotdari-user/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, username, file } = response.data.data;
      setProfileData({ name, username, profilePicture: file });
      setPreview(file ? `http://localhost:8072/api/files/${file}` : null);

      setProfileError(null); // 성공 시 에러 초기화
    } catch (err) {
      console.error("내 정보를 불러오는 중 에러 발생:", err); // 에러 로그 출력
      setProfileError("내 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accessToken]);

  // 프로필 수정
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });

    if (file) {
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    } else {
      setFileName("");
      setPreview(null);
    }
  };


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // 서버에 전송할 formData 객체 생성
    const { name, username, password, passwordConfirm } = profileData;

    const profileDataToSend = new FormData();

    // JSON 문자열로 변환 후 Blob으로 추가
    const requestDto = {
        name: name,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
    };

    profileDataToSend.append(
        "requestDto",
        new Blob([JSON.stringify(requestDto)], { type: "application/json" })
    );

    if (profileData.profilePicture) {
        profileDataToSend.append("file", profileData.profilePicture);
    }
    try {
        await axios.patch("http://localhost:8072/jobbotdari-user/api/profile", profileDataToSend, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
      alert("프로필이 수정되었습니다.");
      fetchProfile(); // 수정 후 최신 데이터 다시 불러오기
    } catch (err) {
      console.error("프로필 수정 중 에러 발생:", err); // 에러 로그 출력
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <div className="mypage-container">
      <Title mainTitle="마이페이지" subTitle="내 정보 관리" />

      {/* 내 정보 섹션 */}
      <div className="profile-section">
        <h2>내 정보</h2>
        {profileError ? (
          <p className="error">{profileError}</p>
        ) : (
          <form onSubmit={handleProfileSubmit}>
            <div>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                disabled
              />
            </div>
            <div>
            <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="새 비밀번호 입력"
                    value={profileData.password}
                    onChange={handleProfileChange}
                />
                </div>
                <div>
                <label htmlFor="passwordConfirm">비밀번호 확인</label>
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="새 비밀번호 확인"
                    value={profileData.passwordConfirm || ""}
                    onChange={handleProfileChange}
                />
                </div>
            <div>
              <label htmlFor="profilePicture">프로필 사진</label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleFileChange}
              />
            </div>
            {preview && <img src={preview} alt="프로필 미리보기" className="profile-preview" />}
            <button type="submit">저장하기</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyPage;
