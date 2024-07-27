import React, { useState } from 'react';

const Button = ({
  children,
  className,
  onClick,
  type = 'button',
  background = 'bg-blue-500',
  borderRadius = 'rounded',
  textColor = 'text-white',
  width = 'w-auto',
  height = 'h-10',
  border = 'border-none',
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  // Build the className string directly based on the state
  const buttonClasses = `
    flex items-center justify-center font-semibold transition-transform duration-200 ease-in-out p-5
    ${background} ${borderRadius} ${textColor} ${width} ${height} ${border}
    ${className}
    ${isClicked ? 'scale-95' : 'hover:scale-105 hover:shadow-lg'}
  `;

  return (
    <button type={type} className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
