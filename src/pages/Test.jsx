import React from 'react';
import CompanyCard from '../components/common/CompanyCard/CompanyCard';
import { InputLabel } from '../components/common/InputLabel';
import Title from '../components/common/Title';

export default function Test() {
    const { SelectableCardList, CardListWithNavigation } = CompanyCard;
    const companyNames = [
        '삼성전자',
        'LG 전자',
        'LG CNS',
        'Google',
        '대웅제약',
        '네이버',
        '카카오',
        'LG 디스플레이',
        '삼성전기',
        '농심',
        '한화',
      ];
    return (
        <div>
            <Title mainTitle="Test Page" mainTitle2="컴포넌트 테스트 페이지" subTitle="다양한 종류가 있다."/>
            {/* <CompanyCard /> */}
            <SelectableCardList data={companyNames} />
            <CardListWithNavigation data={companyNames} />
        </div>
    );
}
