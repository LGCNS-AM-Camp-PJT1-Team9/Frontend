import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo_mini.png';
import lockedIcon from '../assets/images/locked.png';
import unlockedIcon from '../assets/images/unlocked.png';
import './Header.css';

export default function Header({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (isAuthenticated) {
            sessionStorage.removeItem('accessToken');  // 로그아웃
            setIsAuthenticated(false);
            alert('로그아웃 되었습니다.');
            navigate('/login');
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
                {isAuthenticated && (
                    <>
                        <Link to="/">Main</Link>
                        <Link to="/company">Corporations</Link>
                        <Link to="/mypage">Mypage</Link>
                        <Link to="/recruitments">Recruitment</Link>
                    </>
                )}
                <div className="auth_button" onClick={handleAuthClick} style={{ cursor: 'pointer' }}>
                    <img src={isAuthenticated ? unlockedIcon : lockedIcon} alt="Auth Icon" className="auth_icon" />
                    {isAuthenticated ? 'Log out' : 'Log in'}
                </div>
            </nav>
        </header>
    );
}
