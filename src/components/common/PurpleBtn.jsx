import React from 'react';
import './PurpleBtn.css';

const PurpleBtn = ({ type="button", text, width = '100%', onClick }) => {
  return (
    <button 
      className="purple_button" 
      type={type}
      style={{ width }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PurpleBtn;