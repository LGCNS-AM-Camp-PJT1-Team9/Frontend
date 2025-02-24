import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./CompanyNews.css";

export default function CompanyNews() {
  const location = useLocation();
  const { companyId } = useParams();
  const [company, setCompany] = useState(location.state?.company || null);
  const [news, setNews] = useState(location.state?.news || []);

  useEffect(() => {
    if (!company || news.length === 0) {
      axios.get(`http://localhost:8080/api/company/${companyId}`)
        .then(response => {
          setCompany(response.data.data.company);
          setNews(response.data.data.news);
        })
        .catch(error => {
          console.error("데이터 불러오기 실패:", error);
        });
    }
  }, [companyId]);

  if (!company) return <p className="loading">로딩 중...</p>;

  return (
    <div className="company-news-container">
      <h1>{company.name} 기사</h1>
      <div className="news-list">
        {news.map((item, index) => (
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
  );
}
