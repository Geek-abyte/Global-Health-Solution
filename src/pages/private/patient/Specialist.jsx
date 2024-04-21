import React from 'react'
import { cards } from '../../../data/cards'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { ImageCard } from '../../../components'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Specialist = () => {
  return (
    <section>
      <h1 className='text-center text-[32px] p-[20px] font-extrabold'>Consult a specialist</h1>
      <div className='w-full mx-auto flex flex-row gap-8 flex-wrap justify-center items-center p-[20px]'>
        {cards.map((card, index) => (
          <Link to="#" className='hover:bg-primary-5 hover:opacity-80 rounded-[22px]'>
            <ImageCard image={card.image}>{card.content}</ImageCard>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Specialist