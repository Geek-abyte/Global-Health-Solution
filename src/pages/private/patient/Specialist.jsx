import React from 'react'
import { cards } from '../../../data/cards'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { ImageCard } from '../../../components'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const Specialist = () => {
  return (
    <section>
      <div className='w-full mx-auto flex flex-row gap-8 h-[600px] justify-center items-center'>
        {cards.map((card, index) => (
          <ImageCard image={card.image}>{card.content}</ImageCard>
        ))}
      </div>
    </section>
  )
}

export default Specialist