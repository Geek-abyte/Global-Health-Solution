import React, { useState } from 'react';
import classNames from 'classnames';

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

  const buttonClasses = classNames(
    'flex items-center justify-center font-semibold transition-transform duration-200 ease-in-out p-5',
    background,
    borderRadius,
    textColor,
    width,
    height,
    border,
    className,
    {
      'scale-95': isClicked,
      'hover:scale-105 hover:shadow-lg': !isClicked,
    }
  );

  return (
    <button type={type} className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;