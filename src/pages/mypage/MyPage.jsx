import { useState } from "react";
//import UserInfoContainer from "../../components/mypage/UserInfoContainer";
import InterestCompanies from "./interest_company/InterestCompanies";
import ActiveTabBar from "../../components/admin/ActiveTabBar";

/**
 * 마이페이지 컴포넌트 (회원 정보 조회/수정 & 관심 기업 선택)
 */
export default function MyPage() {
    const [selectedTab, setSelectedTab] = useState("userInfo");

    const tabs = [
        { id: "userInfo", label: "회원 정보 조회/수정" },
        { id: "interestCompanies", label: "관심 기업 선택" }
    ];

    return (
        <div>
            {/* 탭 UI */}
            <ActiveTabBar tabs={tabs} onSelect={setSelectedTab} />

            {/* 선택된 탭에 따라 컴포넌트 렌더링 */}
            {/*{selectedTab === "userInfo" && <UserInfoContainer />}*/}
            {selectedTab === "interestCompanies" && <InterestCompanies />}
        </div>
    );
}
