import React from 'react'

const ImageCard = ({ children, image, className, clickFunc }) => {
  return (
    <div onClick={clickFunc} className={`h-[300px] w-[230px] flex flex-col rounded-[22px] p-5 overflow-hidden border-[2px] border-primary-6 cursor-pointer ${className}`}>
      <div className="top h-[340px] w-full rounded-2xl overflow-hidden"><img src={image} alt="card-image" className="inset-0 w-full h-full object-cover" /></div>
      <div className="bottom flex item-center justify-center flex-shrink pt-[20px] font-extrabold text-[24px] text-primary-6">{children}</div>
    </div>
  )
}

export default ImageCard;