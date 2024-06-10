import React, { useEffect, useState } from 'react';
import { consult, doctorIcon, medicMask, pngwing1, roboDoc, userIcon } from '../../assets';
import { Button, ChatBot, ImageSlide } from '../../components';
import { useNavigate } from 'react-router';
import { PATH } from '../../routes/path';
import { cards } from '../../data/cards';
import BlogCarousel from '../../components/BlogCarousel';
import { blogs } from '../../data/blogs';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <ChatBot />
      <section className="Hero relative md:grid md:grid-cols-2 h-[90vh] bg-gradient-to-b md:bg-gradient-to-r from-primary-6 to-white transition-colors">
        <div className="right intro-text p-10 md:pl-20 md:p-0 flex flex-col gap-[25px] md:gap-8 justify-center items-center h-full md:h-auto">
          <div className="font-extrabold text-[45px] md:text-left text-center md:text-[64px] text-white">
            Step into the next generation <span className="text-white">Health care service</span> with <span className="text-primary-9">our AI</span>
          </div>
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

      <section className="card-section flex flex-col py-16 justify-center items-center bg-gray-100">
        <ImageSlide cards={cards} visible={isMobile ? 1 : 4} className='md:w-[1000px] w-[80vw] pl-[25px] md:pl-0 p-2' />
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

      <section className="testimonial-banner flex flex-col sm:flex-row justify-between gap-5 px-[20px] md:px-[120px] py-[40px] md:py-[50px] bg-primary-6">
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
        <div className="large-card relative flex-1 h-[500px] bg-secondary-1 rounded-[20px] p-4 md:p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300 flex items-start justify-start flex-col">
          <img src={pngwing1} alt="" className="absolute right-0 bottom-0 w-[250px] md:w-auto hidden md:block z-0" />
          <div className='relative flex flex-col font-extrabold text-[28px] md:text-[32px] text-primary-10 z-1'>
            Use our next generation AI to check your ailment
          </div>
          <Button
            className="relative mt-[60px] md:mt-[120px] mb-[20px] font-extrabold text-[24px] z-1"
            borderRadius='rounded-lg'
            background='bg-secondary-6 py-[30px] px-[30px]'
            textColor='text-white text-[18px]'
            onClick={() => navigate(PATH.general.signIn)}
          >
            Try it now
          </Button>
        </div>
        <Link to={PATH.general.signIn} className="large-card relative flex-1 h-[500px] bg-primary-1 rounded-[20px] p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300 flex items-start justify-start flex-col">
          <img src={consult} alt="" className="absolute right-0 bottom-0 w-[200px] md:w-[300px] z-0" />
          <div className='relative flex flex-col font-extrabold text-[32px] text-primary-10 z-1'>
            Consult a Doctor
          </div>
        </Link>
      </section>

      <section className="explainer-video flex flex-col justify-center items-center py-16 bg-white">
        <div className="w-full max-w-4xl p-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-primary-10">Our Services Explained</h2>
          <div className="video-container relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/your-video-id"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Explainer Video"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="become-specialist flex flex-col justify-center items-center py-16 bg-primary-9 text-white">
        <div className="w-full max-w-4xl p-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Become One of Our Specialists</h2>
          <p className="text-lg mb-8">Join our team of expert specialists and help us deliver cutting-edge healthcare services.</p>
          <div className="flex justify-center">
            <Button
              borderRadius='rounded-full'
              background='bg-secondary-6 py-3 px-6'
              textColor='text-white text-lg'
              onClick={() => navigate(PATH.specialist.signUp)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      <section className='md:w-[1000px] m-auto'>
        <BlogCarousel blogs={blogs} visible={isMobile ? 1 : 3} />
      </section>
    </>
  );
};

export default Home;
