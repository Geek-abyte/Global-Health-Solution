import React, { useState } from 'react'
import { consult, doctorIcon, medicMask, pngwing1, roboDoc, userIcon } from '../../assets'
import { Button, ChatBot, ImageCard, ImageSlide } from '../../components'
import { useNavigate } from 'react-router'
import { PATH } from '../../routes/path'
import { cards } from '../../data/cards'
import BlogCarousel from '../../components/BlogCarousel'
import { blogs } from '../../data/blogs'


const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <ChatBot />
      <section className="Hero relative md:grid md:grid-cols-2 h-[90vh] bg-gradient-to-b md:bg-gradient-to-r from-primary-6 to-white transition-colors">
        <div className="right intro-text p-10 md:pl-20 md:p-0 flex flex-col gap-[25px] md:gap-8 justify-center items-center h-full md:h-auto">
          <div className="font-extrabold text-[45px] md:text-left text-center md:text-[64px] text-white ">Step in to the next generation <span className="text-secondary-6">Health care service</span> with <span className="text-primary-9">our AI</span></div>
          <Button 
            className="self-start mt-5 self-center md:self-start" 
            borderRadius='rounded-lg'
            border="border-white border-[3px]"
            background='bg-primary-6 py-[30px] px-[30px]'
            textColor='text-white text-[18px]'
            onClick={() => navigate(PATH.general.signUp)}
          >
            Sign Up for Free
          </Button>
        </div>
        <img src={roboDoc} alt="robo doctor" className="absolute right-0 top-0 h-full md:block hidden" />
      </section>

      <section className="card-section flex flex-col py-16 justify-center items-center">
        <ImageSlide cards={cards} visible={1} className='md:w-[1000px] w-[80vw] pl-[25px] md:pl-0 p-2'/>
        <Button
          className="self-center mt-8"
          height='h-[70px]'
          borderRadius="rounded-lg"
          background="bg-secondary-6 py-3 px-6"
          textColor="text-white text-lg"
          onClick={() => navigate(PATH.general.signUp)}
        >
          Sign Up for Free
        </Button>
      </section>

      <section className="textimonial-banner flex flex-col sm:flex-row justify-between gap-5 px-[20px] md:px-[120px] py-[40px] md:py-[50px] bg-primary-6">
        <div className="flex flex-col md:flex-row gap-5 text-white items-center justify-center text-center md:text-left">
          <img src={userIcon} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 text-white items-center justify-center text-center md:text-left">
          <img src={doctorIcon} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 text-white items-center justify-center text-center md:text-left">
          <img src={medicMask} alt="" className="w-[55px] h-[55px]" />
          <div className="flex flex-col">
            <p className="text-[32px] font-extrabold">Title</p>
            <p className="text-[20px] font-semibold">Lorem ipsum dolor sit amet. </p>
          </div>
        </div>
      </section>
      <section className="cross-roads p-8 py-16 md:p-[100px] flex flex-col md:flex-row gap-[40px]">
        <div className="large-card relative flex-1 h-[500px] bg-secondary-1 rounded-[20px] p-4 md:p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300 md:block flex items-center justify-center flex-col">
          <img src={pngwing1} alt="" className="md:absolute md:block right-0 bottom-0 md:w-auto hidden w-[250px] z-0" />
          <div className='relative flex flex-col md:w-[75%] text-center md:text-left font-extrabold text-[28px] md:text-[32px] text-primary-10 top-5 z-1'>
            Use our next generation AI to check your ailment
          </div>
          <Button 
            className="relative mt-[60px] md:mt-[120px] mb-[20px] font-extrabold text-[24px] z-1"
            borderRadius='rounded-lg'
            background='bg-secondary-6 py-[30px] px-[30px]'
            textColor='text-white text-[18px]'
          >
            Try it now
          </Button>
        </div>
        <div className="large-card relative min-h-[300px] md:flex-1 md:h-[500px] bg-primary-1 rounded-[20px] p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300">
          <img src={consult} alt="" className="absolute right-0 bottom-0 md:w-[300px] w-[200px]" />
          <div className='relative flex flex-col w-[75%] font-extrabold text-[32px] text-primary-10 top-5'>
            Consult a Doctor
          </div>
        </div>
      </section>
      <section className='w-[1000px] m-auto'>
        <BlogCarousel blogs={blogs} visible={3} />
      </section>
    </>
  )
}

export default Home