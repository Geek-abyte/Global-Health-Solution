import React from 'react';
import { ImageCard } from "./";
import CustomCarousel from './CustomCarousel';

const ImageSlide = ({ cards, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <CustomCarousel autoScroll={true}>
        {cards.map((card, index) => (
          <div key={index + card.content} className="flex justify-center items-center p-2">
            <ImageCard image={card.image}>{card.content}</ImageCard>
          </div>
        ))}
      </CustomCarousel>
    </div>
  );
};

export default ImageSlide;
