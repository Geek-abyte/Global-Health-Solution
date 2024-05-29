import React from 'react';
import './spinner.css'; // Import spinner CSS

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default LoadingSpinner;
