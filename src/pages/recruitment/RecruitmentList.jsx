import React, { useEffect, useState } from "react";
import axios from "axios";
import './RecruitmentList.css';
import Title from "../../components/common/Title";

export default function RecruitmentList() {
    // const [recruitments, setRecruitments] = useState([]); // 채용 공고 리스트 상태
    // 초기값을 더미 데이터로 설정
    const [recruitments, setRecruitments] = useState([
        {
            id: 1,
            companyId: 66,
            title: "인공지능/머신러닝 엔지니어 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=43586786&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2033-12-31T00:00:00",
        },
        {
            id: 2,
            companyId: 14,
            title: "엔씨소프트 전 부문 수시 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=48103965&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-05-14T13:59:00",
        },
        {
            id: 3,
            companyId: 53,
            title: "[kt ds] 2025년 부문별 경력사원 상시채용",
            requirements: "정규직, 계약직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=49444384&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-02-28T23:59:59",
        },
        {
            id: 1,
            companyId: 66,
            title: "인공지능/머신러닝 엔지니어 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=43586786&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2033-12-31T00:00:00",
        },
        {
            id: 2,
            companyId: 14,
            title: "엔씨소프트 전 부문 수시 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=48103965&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-05-14T13:59:00",
        },
        {
            id: 3,
            companyId: 53,
            title: "[kt ds] 2025년 부문별 경력사원 상시채용",
            requirements: "정규직, 계약직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=49444384&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-02-28T23:59:59",
        },
        {
            id: 1,
            companyId: 66,
            title: "인공지능/머신러닝 엔지니어 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=43586786&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2033-12-31T00:00:00",
        },
        {
            id: 2,
            companyId: 14,
            title: "엔씨소프트 전 부문 수시 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=48103965&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-05-14T13:59:00",
        },
        {
            id: 3,
            companyId: 53,
            title: "[kt ds] 2025년 부문별 경력사원 상시채용",
            requirements: "정규직, 계약직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=49444384&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-02-28T23:59:59",
        },
        {
            id: 1,
            companyId: 66,
            title: "인공지능/머신러닝 엔지니어 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=43586786&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2033-12-31T00:00:00",
        },
        {
            id: 2,
            companyId: 14,
            title: "엔씨소프트 전 부문 수시 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=48103965&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-05-14T13:59:00",
        },
        {
            id: 3,
            companyId: 53,
            title: "[kt ds] 2025년 부문별 경력사원 상시채용",
            requirements: "정규직, 계약직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=49444384&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-02-28T23:59:59",
        },
        {
            id: 1,
            companyId: 66,
            title: "인공지능/머신러닝 엔지니어 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=43586786&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2033-12-31T00:00:00",
        },
        {
            id: 2,
            companyId: 14,
            title: "엔씨소프트 전 부문 수시 채용",
            requirements: "정규직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=48103965&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-05-14T13:59:00",
        },
        {
            id: 3,
            companyId: 53,
            title: "[kt ds] 2025년 부문별 경력사원 상시채용",
            requirements: "정규직, 계약직",
            description: "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=49444384&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            deadline: "2025-02-28T23:59:59",
        },
    ]);

    useEffect(() => {
        const fetchRecruitments = async () => {
            try {
                const response = await axios.get("http://localhost:8072/jobbotdari/api/recruitment", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // 백엔드 통신 임시 주석
                /*
                if (response.data.code === 200) {
                    setRecruitments(response.data.data.companies);
                } else {
                    console.error("API 요청 실패:", response.data);
                }
                */
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
