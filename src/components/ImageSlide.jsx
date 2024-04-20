import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ImageCard } from "./"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

export default class extends React.Component {
  render() {
    const { cards, visible, className } = this.props;

    return (
      <CarouselProvider
        // naturalSlideWidth={100}
        isIntrinsicHeight 
        infinite
        visibleSlides={visible}
        totalSlides={cards.length}
        className={`${className} relative flex justify-center items-center`}
      >
        <Slider>
          {cards.map((card) => (
            <Slide index={0} className="mx-[10px]"><ImageCard image={card.image}>{card.content}</ImageCard></Slide>
          ))}
        </Slider>
        <ButtonBack className='absolute -left-4 z-12 top-[50%] translate-y-[-50%]'><IoIosArrowDropleftCircle size={60} className='opacity-25 text-gray-3 hover:opacity-100'/></ButtonBack>
        <ButtonNext className='absolute -right-4 z-12 top-[50%] translate-y-[-50%]'><IoIosArrowDroprightCircle size={60} className='opacity-25 text-gray-3 hover:opacity-100'/></ButtonNext>
      </CarouselProvider>
    );
  }
}