import React from 'react'

const ImageCard = ({children, image }) => {
  return (
    <div className="h-[300px] w-[230px] b-1 flex flex-col rounded-[22px] p-5 overflow-hidden border-[2px] border-primary-6 ">
      <div className="top h-[340px] w-full rounded-2 overflow-hidden"><img src={image} alt="card-image" className="inset-0 w-full h-full" /></div>
      <div className="bottom flex item-center justify-center flex-shrink pt-[20px] font-extrabold text-[24px] text-primary-6">{children}</div>
    </div>
  )
}

export default ImageCard;