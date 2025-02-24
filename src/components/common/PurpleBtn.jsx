import React from 'react';
import './PurpleBtn.css';

const PurpleBtn = ({ type="button", text, width = '100%' }) => {
  return (
    <button 
      className="purple_button" 
      type={type}
      style={{ width }}
    >
      {text}
    </button>
  );
};

export default PurpleBtn;