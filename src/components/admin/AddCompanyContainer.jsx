import { useState } from "react";
import axios from "axios";
import "./AdminComponents.css";
import Title from "../common/Title";
import { InputLabel } from "../common/InputLabel";
import PurpleBtn from "../common/PurpleBtn";
import LoadingSpinner from "../common/LoadingSpinner"; // 로딩 스피너 컴포넌트 import

export default function AddCompanyContainer() {
    const [formData, setFormData] = useState({
        name: "",
        websiteLink: ""
    });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const userServerBaseUrl = "http://localhost:8072/jobbotdari-user";

    // 로컬 스토리지에서 accessToken 가져오기
    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 기업 추가 API 호출
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        setIsLoading(true); // 로딩 시작

        const accessToken = getAccessToken();
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            setIsLoading(false); // 로딩 종료
            return;
        }

        try {
            const response = await axios.post(
                `${userServerBaseUrl}/admin/company`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("기업이 성공적으로 추가되었습니다.");
            console.log("기업 추가 응답:", response.data);

            // 입력 필드 초기화
            setFormData({
                name: "",
                websiteLink: ""
            });

        } catch (error) {
            console.error("기업 추가 실패:", error);
            alert("기업 추가 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div className="admin-container">
            <Title mainTitle2="기업 추가" subTitle="새로운 기업 정보를 입력하세요." />
            <form onSubmit={handleSubmit} className="add-company-form">
                {/* 기업명 입력 */}
                <InputLabel
                    label="기업명"
                    name="name"
                    placeholder="기업명"
                    value={formData.name}
                    onChange={handleChange}
                />
                {/* 기업 사이트 입력 */}
                <InputLabel
                    label="기업 사이트"
                    name="websiteLink"
                    placeholder="기업 사이트"
                    value={formData.websiteLink}
                    onChange={handleChange}
                />
                {/* 기업 추가 버튼 */}
                <PurpleBtn type="submit" text="기업 추가" disabled={isLoading} /> {/* 로딩 중 버튼 비활성화 */}
            </form>
            {isLoading && <LoadingSpinner />} {/* 로딩 중 스피너 표시 */}
        </div>
    );
}