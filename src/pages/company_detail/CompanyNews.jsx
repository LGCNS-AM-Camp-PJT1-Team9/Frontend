import React from "react";
import { useLocation } from "react-router-dom";

export default function CompanyNews() {
  const location = useLocation();
  const { company, news } = location.state || {}; // 데이터가 없을 경우 undefined 방지

  if (!company || news.length === 0) {
    return <p className="loading">데이터가 없습니다. 이전 페이지에서 접근하세요.</p>;
  }

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
