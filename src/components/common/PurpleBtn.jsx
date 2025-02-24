import React from 'react';
import './PurpleBtn.css';

const PurpleBtn = ({ text, width = '100%' }) => {
  return (
    <button 
      className="purple_button" 
      type="button" 
      style={{ width }}
    >
      {text}
    </button>
  );
};

export default PurpleBtn;