import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo_mini.png';
import lockedIcon from '../assets/images/locked.png';
import unlockedIcon from '../assets/images/unlocked.png';
import './Header.css';
import RecruitmentList from '../pages/recruitment/RecruitmentList';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleAuthClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
            alert('로그아웃 되었습니다.');
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <div className="logo_container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <nav className="header_menu">
                {/*로그인 상태에 따라 메뉴 보임 여부 변경 */} 
                {/* {isLoggedIn && ( */}
                    <>
                        <Link to="/">Main</Link>
                        <Link to="/news">News</Link>
                        <Link to="/corporations">Corporations</Link>
                        <Link to="/mypage">Mypage</Link>
                        <Link to="/recruitments" element={<RecruitmentList />}>Recruitment</Link>
                    </>
                {/* )} */}
                <div className="auth_button" onClick={handleAuthClick} style={{ cursor: 'pointer' }}>
                    <img src={isLoggedIn ? unlockedIcon : lockedIcon} alt="Auth Icon" className="auth_icon" />
                    {isLoggedIn ? 'Log out' : 'Log in'}
                </div>
            </nav>
        </header>
    );
}
