import React, { useState } from "react";
import "./ActiveTabBar.css"; 
import Title from "../common/Title";

/**
 * 
 * 관리자 사용자에 사용될 ActiveTabBar 컴포넌트. 
 * 탭을 눌렀을 때 하단부 컴포넌트가 변경되게 구현하기 위함. 
 * 
 */

const ActiveTabBar = ({ tabs, onSelect }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); 

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onSelect(tabId); 
  };

  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => handleTabClick(tab.id)}
        >
          <Title
            mainTitle2={tab.label}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveTabBar;