import React from 'react';
import { logoWhite } from '../assets';
import { logoDark } from '../assets';

const Loader = ({ image, dark }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        // dark ? 
        // <img src={logoWhite} alt="Loading..." className="w-32 mb-4 heartbeat" /> :
        <img src={logoDark} alt="loading..." className="w-32 mb-4 heartbeat" />
      }
    </div>
  );
};

export default Loader;
