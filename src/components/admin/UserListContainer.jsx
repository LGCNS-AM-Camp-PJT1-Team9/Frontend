import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminComponents.css"; 
import UserCard from "./UserCard";
import PurpleBtn from "../common/PurpleBtn"; 
import { useNavigate } from "react-router-dom";

export default function UserListContainer() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const navigate = useNavigate();

    const userServerBaseUrl = "http://localhost:8072/jobbotdari-user";

    // 로컬 스토리지에서 accessToken 가져오기
    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    // 사용자 리스트 조회
    useEffect(() => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        axios.get(`${userServerBaseUrl}/admin/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            if (response.data && response.data.data) {
                console.log(response.data.data);
                setUsers(response.data.data);
            }
        })
        .catch(error => {
            console.error("사용자 데이터를 불러오는 데 실패했습니다.", error);
            alert("사용자 조회에 실패하였습니다.");
        });
    }, []);

    // 사용자 선택/해제 토글
    const toggleSelectUser = (id) => {
        setSelectedUsers(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    // 선택된 사용자 삭제 API 호출
    const handleDeleteUsers = async () => {
        if (selectedUsers.size === 0) {
            alert("삭제할 사용자를 선택하세요.");
            return;
        }

        const accessToken = getAccessToken();
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const deletedUserIds = [];
            for (const userId of selectedUsers) {
                try {
                    await axios.delete(`${userServerBaseUrl}/admin/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    deletedUserIds.push(userId);
                } catch (error) {
                    console.error(`사용자 ${userId} 삭제 실패:`, error);
                }
            }

            // 삭제된 사용자 목록을 제외하고 상태 업데이트
            setUsers(users.filter(user => !deletedUserIds.includes(user.id)));
            setSelectedUsers(new Set()); // 선택 초기화

            alert("선택한 사용자가 삭제되었습니다.");
        } catch (error) {
            console.error("사용자 삭제 실패:", error);
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="admin-container">
            {/* 피그마 디자인처럼 중앙에 제목/설명 */}
            <h2 className="admin-title">사용자 리스트</h2>
            <p className="admin-subtitle">삭제할 유저를 선택해주세요.</p>

            <div className="user-list">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        name={user.username}
                        // 선택 여부에 따라 CSS 구분
                        isSelected={selectedUsers.has(user.id)}
                        onClick={() => toggleSelectUser(user.id)}
                    />
                ))}
            </div>

            <PurpleBtn text="사용자 삭제" onClick={handleDeleteUsers} /> {/* PurpleBtn 사용 */}
        </div>
    );
}