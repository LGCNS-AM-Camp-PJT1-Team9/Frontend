import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import UserForm from './UserForm';
import axios from 'axios';

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch user data from an API
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem("accessToken");
                const response = await axios.get('http://localhost:8072/jobbotdari-user/api/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.data.data;
                console.log("Fetched user data:", data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        console.log("Updated userData:", userData);
    }, [userData]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUserUpdate = (updatedData) => {
        setUserData(updatedData);
        setIsEditing(false);
    };

    return (
        <div>
            <div>
                {isEditing ? (
                <UserForm userData={userData} onUserUpdate={handleUserUpdate} />
                ) : userData ? (
                <UserProfile user={userData} onEditToggle={handleEditToggle} />
                ) : (
                <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;