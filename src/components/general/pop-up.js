import React, { useState } from 'react';

const PopUp = ({ isOpen, onClose, children }) => {
  const popupStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: '99999',
  };

  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '50px 0px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={popupStyle} onClick={onClose}>
      <div style={contentStyle}>
        {children}
        <button className='rounded border-2 bg-gray-100 w-20 h-10  font-bold text-xl mt-10' >Ok</button>

      </div>
    </div>
  );
};

export default PopUp;
