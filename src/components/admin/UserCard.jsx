import React from "react";
import "./AdminComponents.css";
import userDefaultImg from '../../assets/images/user_default.png';

export default function UserCard({ name, isSelected, onClick }) {
    return (
        <div 
            className={`user-card ${isSelected ? "selected" : ""}`}
            onClick={onClick}
        >
            <img src={userDefaultImg} alt="User" />
            <span className="user-name">{name}</span>
        </div>
    );
}