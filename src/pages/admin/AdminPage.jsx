import { useState } from "react";
import ActiveTabBar from "../../components/admin/ActiveTabBar";
import AddCompanyContainer from "../../components/admin/AddCompanyContainer";
import LogContainer from "../../components/admin/LogContainer";
import UserListContainer from "../../components/admin/UserListContainer";

export default function AdminPage() {
    const [selectedTab, setSelectedTab] = useState("users");

    const tabs = [
        { id: "users", label: "사용자 리스트" },
        { id: "addCompany", label: "기업 추가" },
        { id: "logs", label: "로그 확인" }
    ];
    
    return (
        <div>
            <ActiveTabBar tabs={tabs} onSelect={setSelectedTab} />

            {selectedTab === "users" && <UserListContainer/>}
            {selectedTab === "addCompany" && <AddCompanyContainer/>}
            {selectedTab === "logs" && <LogContainer />}
        </div>
    );
}