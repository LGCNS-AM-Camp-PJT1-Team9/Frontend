import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LogContainer.css";
import Title from "../common/Title";
import UserBtn from "./UserBtn";
import LoadingSpinner from "../common/LoadingSpinner"; 
import { useNavigate } from "react-router-dom";

export default function LogContainer() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [userList, setUserList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();

    const userServerBaseUrl = "http://localhost:8072/jobbotdari-user";

    // 로컬 스토리지에서 accessToken 가져오기
    const getAccessToken = () => {
        return sessionStorage.getItem("accessToken");
    };

    // 로그 데이터 가져오기
    useEffect(() => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            setIsLoading(false); // 로딩 종료
            navigate('/login');
            return;
        }

        axios.get(`${userServerBaseUrl}/admin/logs`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => {
            if (response.data && response.data.data) {
                const rawLogs = response.data.data;

                console.log("✅ [useEffect] rawLogs:", rawLogs);

                // DTO에 맞게 데이터 처리
                const updatedLogs = rawLogs.map(log => ({
                    ...log,
                    name: log.userId === null ? "시스템 로그" : log.name
                }));

                const uniqueUsers = [
                    ...new Map(
                        updatedLogs.map(log => [
                            String(log.userId),
                            { userId: String(log.userId), name: log.name }
                        ])
                    ).values()
                ];

                console.log("[useEffect] Fetched Logs:", updatedLogs);
                console.log("[useEffect] Users:", uniqueUsers);

                setLogs(updatedLogs);
                setFilteredLogs(updatedLogs);
                setUserList(uniqueUsers);
            }
        })
        .catch(error => {
            console.error("로그 데이터를 불러오는 데 실패했습니다.", error);
            alert("로그 조회에 실패하였습니다.");
        })
        .finally(() => {
            setIsLoading(false); // 로딩 종료
        });
    }, []);

    // 특정 userId 클릭 시 해당 사용자의 로그만 필터링
    const handleUserClick = (clickedUserId) => {
        console.log("▶ [handleUserClick] clickedUserId:", clickedUserId);

        setSelectedUserId(clickedUserId);
        const filtered = logs.filter(log => String(log.userId) === clickedUserId);

        console.log("▶ [handleUserClick] filtered:", filtered);

        setFilteredLogs(filtered);
    };

    // 모든 로그 표시 기능 추가
    const handleShowAllLogs = () => {
        setSelectedUserId(null);
        setFilteredLogs(logs);
    };

    return (
        <div className="admin-container">
            <Title mainTitle2="로그 확인" subTitle="로그를 확인해 보아요" />

            {isLoading ? ( // 로딩 중 스피너 표시
                <LoadingSpinner />
            ) : (
                <>
                    <div className="user-buttons">
                        <UserBtn
                            text="전체 로그"
                            onClick={handleShowAllLogs}
                            selected={selectedUserId === null}
                        />
                        {userList.map((userObj, index) => {
                            const { userId, name } = userObj;
                            return (
                                <UserBtn
                                    key={index}
                                    text={name}
                                    onClick={() => handleUserClick(userId)}
                                    selected={selectedUserId === userId}
                                />
                            );
                        })}
                    </div>

                    <div className="log-box">
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map((log, index) => (
                                <div key={index} className="log-item">
                                    <strong>{log.action}</strong> - {log.description}
                                    <span className="log-time">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="no-logs">로그가 없습니다.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}