import React from 'react';
import './Title.css';

// 페이지 제목
// mainTitle: 메인 제목
// subTitle: 부제목 및 설명
function Title({ mainTitle, subTitle }) {
    return (
        <div className="title_container">
            <h1 className="main_title">{mainTitle}</h1>
            <h2 className="sub_title">{subTitle}</h2>
        </div>
    );
}

export default Title;
