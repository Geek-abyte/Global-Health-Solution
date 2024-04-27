import React from 'react';

const ModalContainer = ({ modal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative mx-auto max-w-[90vw] rounded-lg bg-white overflow-hidden">
        <div className="">{modal}</div>
      </div>
    </div>
  );
};

export default ModalContainer;