import React from 'react';
import './Title.css';

// 페이지 제목
// mainTitle: 메인 제목
// subTitle: 부제목 및 설명
function Title({ mainTitle, mainTitle2, subTitle }) {
    return (
        <div className="title_container">
            <div className="main_title">{mainTitle}</div>
            <div className="main_title2">{mainTitle2}</div>
            <div className="sub_title">{subTitle}</div>
        </div>
    );
}

export default Title;
