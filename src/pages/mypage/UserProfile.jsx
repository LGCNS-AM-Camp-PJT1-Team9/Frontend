import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userData }) => {
    console.log("UserProfile userData:", userData);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/mypage/edit');
    };

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Image:</strong> {userData.file}</p>
            <button onClick={handleEdit}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;