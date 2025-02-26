import React, { useEffect, useState } from "react";
import axios from "axios";
import './RecruitmentList.css';
import Title from "../../components/common/Title";

export default function RecruitmentList() {
    const [recruitments, setRecruitments] = useState([]); // 채용 공고 리스트 상태

    useEffect(() => {
        const fetchRecruitments = async () => {
            try {
                const response = await axios.get("http://localhost:8072/jobbotdari/api/recruitment", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.data.code === 200) {
                    setRecruitments(response.data.data.companies);
                } else {
                    console.error("API 요청 실패:", response.data);
                }
            } catch (error) {
                console.error("API 요청 중 오류 발생:", error);
            }
        };

        fetchRecruitments();
    }, []);

    return (
        <div className="recruitment-container">
            <Title mainTitle="최신 인기 공고" subTitle="주목받는 채용 공고로 취업 기회를 잡으세요!"/>
            <div className="recruitment-grid">
                {recruitments.map((job) => (
                    <a
                        key={job.id}
                        href={job.description.startsWith("http") ? job.description : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="recruitment-card"
                    >
                        <h3 className="company-title">{job.title}</h3>
                        <p className="requirements">{job.requirements}</p>
                        <p className="deadline">
                            마감 | {job.deadline === "2033-12-31T00:00:00" ? "상시 채용" : job.deadline.split("T")[0]}
                        </p>
                    </a>
                ))}
            </div>

        </div>
    );
}
