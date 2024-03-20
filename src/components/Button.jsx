import React, { useState } from 'react';

const Button = ({ children, className, onClick, type }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <button type={type}
      className={`relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ${className} ${
        isClicked
          ? 'scale-95 shadow-inner shadow-blue-800'
          : 'scale-100 shadow-md shadow-blue-700'
      }`}
      onClick={handleClick}
    >
      <span className={`relative z-10 ${isClicked ? 'text-blue-200' : 'text-white'}`}>
        {children}
      </span>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-700 rounded-md transition-all duration-300 ${
          isClicked ? 'scale-150' : 'scale-0'
        }`}
      />
    </button>
  );
};

export default Button;