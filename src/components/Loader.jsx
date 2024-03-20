import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-24 h-24 rounded-full border-8 border-green-500 border-t-8 border-t-transparent animate-spin animate-spin-slow"></div>
    </div>
  );
};

export default Loader;