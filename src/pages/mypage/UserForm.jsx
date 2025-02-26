import React, { useState } from 'react';

const UserForm = ({ userData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: userData.name || '',
        username: userData.username || '',
        file: userData.file || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    readOnly
                />
            </div>
            <div>
                <label>Image:</label>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default UserForm;