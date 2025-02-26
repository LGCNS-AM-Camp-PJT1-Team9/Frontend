import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminComponents.css"; 
import UserCard from "./UserCard";
import PurpleBtn from "../common/PurpleBtn"; 
import LoadingSpinner from "../common/LoadingSpinner"; // 로딩 스피너 컴포넌트 import
import { useNavigate } from "react-router-dom";

export default function UserListContainer() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 변수
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userServerBaseUrl = "http://localhost:8072/jobbotdari-user";

    // 로컬 스토리지에서 accessToken 가져오기
    const getAccessToken = () => {
        return sessionStorage.getItem("accessToken");
    };

    // 사용자 리스트 조회
    useEffect(() => {
        const fetchUsers = async () => {
            const accessToken = getAccessToken();
            if (!accessToken) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${userServerBaseUrl}/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data && response.data.data) {
                    setUsers(response.data.data);
                }
            } catch (err) {
                console.error("사용자 데이터를 불러오는 데 실패했습니다.", err);
                setError("사용자 조회에 실패하였습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

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
                } catch (err) {
                    console.error(`사용자 ${userId} 삭제 실패:`, err);
                }
            }

            // 삭제된 사용자 목록을 제외하고 상태 업데이트
            setUsers(users.filter(user => !deletedUserIds.includes(user.id)));
            setSelectedUsers(new Set()); // 선택 초기화

            alert("선택한 사용자가 삭제되었습니다.");
        } catch (err) {
            console.error("사용자 삭제 실패:", err);
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />; // 로딩 중이면 스피너 컴포넌트 표시
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="admin-container">
            <h2 className="admin-title">사용자 리스트</h2>
            <p className="admin-subtitle">삭제할 유저를 선택해주세요.</p>

            <div className="user-list">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        name={user.username}
                        isSelected={selectedUsers.has(user.id)}
                        onClick={() => toggleSelectUser(user.id)}
                    />
                ))}
            </div>

            <PurpleBtn text="사용자 삭제" onClick={handleDeleteUsers} />
        </div>
    );
}