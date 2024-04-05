import React from 'react';
import { logoWhite } from '../assets';

const Loader = ({ image }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logoWhite} alt="Loading..." className="w-32 mb-4 heartbeat" />
    </div>
  );
};

export default Loader;
