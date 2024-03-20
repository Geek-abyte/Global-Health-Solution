import React from 'react'
import { doctorIcon, medicMask, pngwing1, rect58, rect59, rect60, rect61, roboDoc, userIcon } from '../../assets'
import { Button, ImageCard } from '../../components'

const imagecards = [
  {
    'image': rect58,
    'content': 'Pedeatrician'
  },
  {
    'image': rect59,
    'content': 'Cardiologist'
  },
  {
    'image': rect60,
    'content': 'Dermatologist'
  },
  {
    'image': rect61,
    'content': 'Neurologist'
  }
]

const Home = () => {
  return (
    <>
      <section className="Hero relative md:grid md:grid-cols-2 h-[90vh] bg-gradient-to-r from-primary-6 to-white transition-colors">
        <div className="right intro-text p-10 md:pl-20 md:p-0 flex flex-col justify-center items-center">
          <div className="font-extrabold text-[64px] text-white ">Step in to the next generation <span className="text-secondary-6">Health care service</span> with <span className="text-primary-9">our AI</span></div>
          <Button className="self-start mt-5">Sign Up for Free</Button>
        </div>
        <img src={roboDoc} alt="robo doctor" className="absolute right-0 top-0 h-full" />
      </section>

      <section className="card-section flex flex-col pb-[80px] items-center justify-center">
        <div className="card-top py-[50px] px-[20px] flex flex-row space-x-10">
          {
            imagecards.map((card) => (
            <ImageCard image={card.image}>{card.content}</ImageCard>
            ))
          }
        </div>
        <Button className="self-center">Sign Up for Free</Button>
      </section>
      <section className="textimonial-banner flex md:flex-row justify-between px-[120px] py-[50px] bg-primary-6">
        <div className="flex flex-row space-x-5 text-white items-center justify-center">
          <img src={userIcon} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
        <div className="flex flex-row space-x-5 text-white items-center justify-center">
          <img src={doctorIcon} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
        <div className="flex flex-row space-x-5 text-white items-center justify-center">
          <img src={medicMask} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
      </section>
      <section className="cross-roads p-[100px] flex md:flex-row space-x-[20px]">
        <div className="large-card relative flex-1 h-[500px] bg-secondary-1 rounded-[20px] p-10">
          <img src={pngwing1} alt="" className="absolute right-0 bottom-0 " />
          <div className='relative flex flex-col w-[75%] font-extrabold text-[32px] text-primary-10 top-5'>
            use our next generation AI to check your ailment
          </div>
          <Button className="mt-[120px] font-extrabold text-[24px]">Try it now</Button>
        </div>
        <div className="large-card relative flex-1 h-[500px] bg-primary-1 rounded-[20px]">
          <div className='relative flex flex-col w-[75%] font-extrabold text-[32px] text-primary-10 top-5'>
            use our next generation AI to check your ailment
          </div>
        </div>
      </section>
    </>
  )
}

export default Home