import React from 'react';
import Box from '../../components/main/Box';
import './Main.css';
import MypageImage from '../../assets/images/Main_Mypage.png';
import CorporationsImage from '../../assets/images/Main_Corporation.png';
import RecruitmentImage from '../../assets/images/Main_Recruitment.png';
import Title from '../../components/common/Title';

const Main = () => {
    const boxData = [
        {
            link: "/corporations",
            image: CorporationsImage,
            title: "기업 정보와 뉴스 조회",
            description: "기업 정보와 그 기업의 뉴스의 정보를 \n조회할 수 있고 관심 기업을 설정하면 \n그 정보만 조회할 수 있어요 !",
        },
        {
            link: "/mypage",
            image: MypageImage,
            title: "마이페이지",
            description: "관심 기업을 설정하여 \n추천 기업과 뉴스를 맞춤형으로 봐요!",
        },
        {
            link: "/recruitment",
            image: RecruitmentImage,
            title: "채용 정보",
            description: "인기 있는 채용 공고를 \n한눈에 볼 수 있어요!",
        }
    ];

    return (
        <>
            <Title mainTitle2="메인 페이지" subTitle="취업봇다리의 모든 기능을 한번에"/>
            <div className="main-container">
                {boxData.map((box, index) => (
                    <Box 
                        key={index}
                        link={box.link}
                        image={box.image}
                        title={box.title}
                        description={box.description}
                        width={box.width}
                    />
                ))}
            </div>
        </>
    );
};

export default Main;