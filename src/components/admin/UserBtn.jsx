import React from 'react';
import './UserBtn.css';

const UserBtn = ({ text, onClick, selected }) => {
  return (
    <button 
      className={`user-button ${selected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default UserBtn;