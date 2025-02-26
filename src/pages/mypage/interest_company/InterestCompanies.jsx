import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../../components/common/Title";
import "./InterestCompanies.css";

const InterestCompanies = () => {
    const [companies, setCompanies] = useState([]); // 전체 기업 목록
    const [favoriteCompanies, setFavoriteCompanies] = useState([]); // 관심 기업 목록 (ID 배열)
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const getAccessToken = () => sessionStorage.getItem("accessToken");

    useEffect(() => {
        fetchCompanies(); // 전체 기업 목록 가져오기
        fetchFavoriteCompanies(); // 관심 기업 목록 가져오기
    }, []);

    // 전체 기업 목록 조회
    const fetchCompanies = async () => {
        try {
            const response = await axios.get("http://localhost:8072/jobbotdari/api/company");
            if (response.status === 200) {
                setCompanies(response.data.data.companies);
            } else {
                setErrorMessage("전체 기업 목록을 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("기업 목록을 불러오는 데 실패했습니다.");
            console.error("기업 목록 조회 실패:", error);
        }
    };

    // 관심 기업 목록 조회
    const fetchFavoriteCompanies = async () => {
        try {
            const accessToken = getAccessToken();
            const response = await axios.get("http://localhost:8072/jobbotdari-user/api/user/interests", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            // 응답 데이터에서 companyIds 배열 가져오기
            if (response.status === 200 && response.data.companyIds) {
                setFavoriteCompanies(response.data.companyIds); // 관심 기업 ID 배열 저장
            } else {
                setErrorMessage("관심 기업 목록을 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("관심 기업 목록을 불러오는 데 실패했습니다.");
            console.error("관심 기업 목록 조회 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    // 관심 기업 추가 (즉시 UI 업데이트 후 서버 요청)
    const addInterestCompany = async (companyId) => {
        setFavoriteCompanies((prev) => [...prev, companyId]); // 즉시 상태 업데이트
        try {
            const accessToken = getAccessToken();
            const response = await axios.post("http://localhost:8072/jobbotdari-user/api/user/interests", 
                { companyId }, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status !== 200) {
                alert("관심 기업 추가에 실패했습니다.");
                setFavoriteCompanies((prev) => prev.filter(id => id !== companyId)); // 실패 시 롤백
            }
        } catch (error) {
            alert("서버와의 연결이 원활하지 않습니다.");
            console.error("관심 기업 추가 실패:", error);
            setFavoriteCompanies((prev) => prev.filter(id => id !== companyId)); // 실패 시 롤백
        }
    };

    // 관심 기업 삭제 (즉시 UI 업데이트 후 서버 요청)
    const removeInterestCompany = async (companyId) => {
        setFavoriteCompanies((prev) => prev.filter(id => id !== companyId)); // 즉시 상태 업데이트
        try {
            const accessToken = getAccessToken();
            const response = await axios.delete(`http://localhost:8072/jobbotdari-user/api/user/interests/${companyId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.status !== 200) {
                alert("관심 기업 삭제에 실패했습니다.");
                setFavoriteCompanies((prev) => [...prev, companyId]); // 실패 시 롤백
            }
        } catch (error) {
            alert("서버와의 연결이 원활하지 않습니다.");
            console.error("관심 기업 삭제 실패:", error);
            setFavoriteCompanies((prev) => [...prev, companyId]); // 실패 시 롤백
        }
    };

    // 관심 기업 여부 확인
    const isFavorite = (companyId) => favoriteCompanies.includes(companyId);

    // 클릭 시 관심 기업 추가/삭제 기능 (즉시 색 변경)
    const toggleInterest = (companyId) => {
        if (isFavorite(companyId)) {
            removeInterestCompany(companyId);
        } else {
            addInterestCompany(companyId);
        }
    };

    return (
        <div className="interest_companies_container">
            <Title mainTitle="관심 기업 선택" subTitle="관심가는 기업을 선택해 주세요!" />

            {/* 기업 리스트 */}
            <div className="company_grid">
                {loading ? (
                    <p>불러오는 중...</p>
                ) : errorMessage ? (
                    <p className="error_message">{errorMessage}</p>
                ) : (
                    companies.map(company => (
                        <div
                            key={company.id}
                            className={`company_card ${isFavorite(company.id) ? "selected" : ""}`}
                            onClick={() => toggleInterest(company.id)}
                        >
                            {company.name}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InterestCompanies;
