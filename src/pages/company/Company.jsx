import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/common/Title";
import "./Company.css";
import axios from "axios";

const CompanyList = () => {
  // 전체 기업 데이터 상태
  const [companies, setCompanies] = useState([]);
  // 관심 기업 데이터 상태
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);
  // 로딩 상태 관리
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  // 에러 상태 관리
  const [errorCompanies, setErrorCompanies] = useState(null);
  const [errorFavorites, setErrorFavorites] = useState(null);
  const navigate = useNavigate();

  // 로컬 저장소에서 Access Token 가져오기
  const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  // 컴포넌트가 마운트될 때 기업 데이터와 관심 기업 데이터 가져오기
  useEffect(() => {
    // 전체 기업 데이터 가져오기
    const fetchCompanies = async () => {
      try {
        // API 호출: 전체 기업 목록
        const companyResponse = await axios.get("http://localhost:8072/jobbotdari/api/company");
        console.log(companyResponse.data);
        setCompanies(companyResponse.data.data.companies);

        // 데이터가 비어 있을 경우 에러 메시지 설정
        if (companyResponse.data.data.companies.length === 0) {
          setErrorCompanies("전체 기업 목록이 비어있습니다.");
        }
      } catch (err) {
        // API 호출 실패 시 에러 메시지 설정
        setErrorCompanies("기업 목록을 불러오는 데 실패했습니다.");
      } finally {
        // 로딩 상태 업데이트
        setLoadingCompanies(false);
      }
    };

    // 관심 기업 데이터 가져오기
    const fetchFavoriteCompanies = async () => {
      try {
        // Access Token 가져오기
        const accessToken = getAccessToken();
        console.log("Access Token:", accessToken);

        // API 호출: 관심 기업 목록
        const favoriteResponse = await axios.get("http://localhost:8072/jobbotdari-user/api/user/interests", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
          },
        });

        // API 응답 데이터 확인
        console.log("Favorite Response:", favoriteResponse.data);

        // 관심 기업 데이터 유효성 확인
        const favoriteData = favoriteResponse.data.companyIds; // companyIds 배열 추출
        if (!Array.isArray(favoriteData)) {
          console.error("companyIds 필드가 배열이 아닙니다:", favoriteData);
          throw new Error("API 응답 데이터가 올바르지 않습니다.");
        }

        // 관심 기업 데이터 상태 업데이트
        setFavoriteCompanies(favoriteData);

        // 데이터가 비어 있을 경우 에러 메시지 설정
        if (favoriteData.length === 0) {
          setErrorFavorites("관심 기업 목록이 비어있습니다.");
        }
      } catch (err) {
        // API 호출 실패 시 에러 메시지 설정
        setErrorFavorites("관심기업 목록을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        // 로딩 상태 업데이트
        setLoadingFavorites(false);
      }
    };

    // 두 API 호출 실행
    fetchCompanies();
    fetchFavoriteCompanies();
  }, []);

  // 기업 카드 클릭 시 상세 페이지로 이동
  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  return (
    <div className="company-list-container">
      {/* 페이지 제목 */}
      <Title mainTitle="기업 정보 조회하기" subTitle="관심 기업 조회 및 전체 기업에 대한 정보를 조회해 보아요!" />
      
      {/* 관심 기업 섹션 */}
      <div className="favorite-companies">
        <h2>관심 기업</h2>
        {loadingFavorites ? (
          // 관심 기업 로딩 중
          <p className="loading">관심 기업을 불러오는 중...</p>
        ) : errorFavorites ? (
          // 관심 기업 로드 실패 시 에러 메시지
          <p className="error">{errorFavorites}</p>
        ) : (
          // 관심 기업 목록 렌더링
          <div className="company-grid">
            {companies
              .filter((company) => favoriteCompanies.includes(company.name)) // 관심 기업 필터링
              .map((company) => (
                <div
                  key={company.id}
                  className="company-card favorite"
                  onClick={() => handleCompanyClick(company.id)}
                >
                  <h3>{company.name}</h3>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 전체 기업 섹션 */}
      <div className="all-companies">
        <h2>전체 기업</h2>
        {loadingCompanies ? (
          // 전체 기업 로딩 중
          <p className="loading">전체 기업을 불러오는 중...</p>
        ) : errorCompanies ? (
          // 전체 기업 로드 실패 시 에러 메시지
          <p className="error">{errorCompanies}</p>
        ) : (
          // 전체 기업 목록 렌더링
          <div className="company-grid">
            {companies.map((company) => (
              <div
                key={company.id}
                className="company-card"
                onClick={() => handleCompanyClick(company.id)}
              >
                <h3>{company.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
