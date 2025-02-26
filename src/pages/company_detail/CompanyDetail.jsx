import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompanyDetail() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8072/jobbotdari/api/company/${companyId}`);
        setCompany(response.data.data.company);
        setNews(response.data.data.news);
      } catch (err) {
        setError("기업 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [companyId]);

  if (loading) return <p className="loading">로딩 중...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="company-detail-container">
      <p className="company-name">{company.name}</p>
      <p className="company-description">{company.description}</p>

      {/* 기업 뉴스 섹션 */}
      <div className="company-news-section">
        <h2 
          className="news-link"
          onClick={() => navigate(`/company/${companyId}/news`, { state: { company, news } })}
          style={{ cursor: "pointer", color: "#6a5acd", textDecoration: "underline" }}
        >
          + {company.name} 기사 더 보기
        </h2>

        <div className="news-list">
          {news.slice(0, 3).map((item, index) => (
            <div key={index} className="news-item">
              <h3>{item.title}</h3>
              <p className="news-date">{new Date(item.publishedDate).toLocaleDateString()}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
                자세히 보기 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
