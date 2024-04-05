import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handlePositionTooltip = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    const tooltipWidth = 150; // Set the desired width of the tooltip
    const left = buttonRect.left + buttonRect.width / 2 - tooltipWidth / 2;
    let top = buttonRect.top - 10; // Adjust the vertical position as needed

    // Check if the tooltip would go outside the window bounds
    if (top < 0) {
      top = buttonRect.bottom + 10; // Position below the button if going outside the top
    }

    setTooltipStyle({ left: `${left}px`, top: `${top}px` });
  };

  return (
    <div className="relative inline-block" onMouseEnter={handlePositionTooltip}>
      {children}
      {showTooltip && (
        <span
          className="absolute bg-gray-800 text-white text-xs p-1 rounded-md opacity-100 transition-opacity duration-300"
          style={tooltipStyle}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
