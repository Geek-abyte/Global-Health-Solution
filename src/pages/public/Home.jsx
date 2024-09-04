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
  const iconlist = ['Medical Supplies', 'Medical Equipment', 'Air Ambulance Services']

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
        <div className="right intro-text p-6 md:p-10 md:pl-20 flex flex-col gap-6 md:gap-8 justify-center items-center md:items-start h-full md:h-auto">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-[45px] md:text-left text-center lg:text-[60px] lg:leading-[60px] text-white">
            Step into the next generation <span className="text-white">Health care service</span> with <span className="text-primary-9">our AI</span>
          </h1>
          <Button
            className="self-center md:self-start mt-4 md:mt-5 w-full sm:w-auto"
            borderRadius='rounded-lg'
            border="border-white border-[3px]"
            background='bg-primary-6 py-3 px-6 md:py-[30px] md:px-[30px]'
            textColor='text-white text-lg md:text-[18px]'
            onClick={() => navigate(PATH.general.signUp)}
          >
            Sign Up for Free
          </Button>
        </div>
        <img src={roboDoc} alt="robo doctor" className="absolute right-0 top-0 h-full md:block hidden" />
      </section>

      <section className="card-section flex flex-col py-10 md:py-16 justify-center items-center bg-gray-100">
        <ImageSlide cards={cards} visible={isMobile ? 1 : 4} className='w-[90vw] md:w-[1000px] px-4 md:px-0' />
        <Button
          className="self-center mt-6 md:mt-8 w-full sm:w-auto"
          height='h-[50px] md:h-[70px]'
          borderRadius="rounded-lg"
          background="bg-secondary-6 py-3 px-6"
          textColor="text-white text-lg"
          onClick={() => navigate(PATH.general.signUp)}
        >
          Sign Up for Free
        </Button>
      </section>

      <section className="testimonial-banner flex flex-col sm:flex-row justify-between gap-8 sm:gap-5 px-6 md:px-[120px] py-10 md:py-[50px] bg-primary-6">
        {[userIcon, doctorIcon, medicMask].map((icon, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 text-white items-center justify-center text-center sm:text-left">
            <img src={icon} alt="" className="w-[55px] h-[55px]" />
            <div className="flex flex-col">
              <p className="text-2xl md:text-[32px] font-bold">{iconlist[index]}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="cross-roads p-6 sm:p-8 md:p-[100px] flex flex-col sm:flex-row gap-8 md:gap-[40px]">
        <div className="large-card relative flex-1 h-[400px] md:h-[500px] bg-secondary-1 rounded-[20px] p-6 md:p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300 flex items-start justify-start flex-col">
          <img src={pngwing1} alt="" className="absolute right-0 bottom-0 w-[200px] md:w-[250px] hidden sm:block z-0" />
          <div className='relative flex flex-col font-extrabold text-2xl sm:text-[28px] md:text-[32px] text-primary-10 z-1'>
            Use our next generation AI to check your ailment
          </div>
          <Button
            className="relative mt-8 sm:mt-[60px] md:mt-[120px] mb-[20px] font-extrabold text-xl sm:text-[24px] z-1 w-full sm:w-auto"
            borderRadius='rounded-lg'
            background='bg-secondary-6 py-3 px-6 md:py-[30px] md:px-[30px]'
            textColor='text-white text-lg md:text-[18px]'
            onClick={() => navigate(PATH.general.signIn)}
          >
            Try it now
          </Button>
        </div>
        <Link to={PATH.general.signIn} className="large-card relative flex-1 h-[400px] md:h-[500px] bg-primary-1 rounded-[20px] p-6 md:p-10 hover:scale-105 hover:z-10 hover:shadow-lg transition-transform duration-300 flex items-start justify-start flex-col">
          <img src={consult} alt="" className="absolute right-0 bottom-0 w-[200px] md:w-[300px] z-0 hidden sm:block" />
          <div className='relative flex flex-col font-extrabold text-2xl sm:text-[28px] md:text-[32px] text-primary-10 z-1'>
            Consult a Doctor
          </div>
        </Link>
      </section>

      <section className="explainer-video flex flex-col justify-center items-center py-10 md:py-16 bg-white">
        <div className="w-full max-w-4xl p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-center text-primary-10">Our Services Explained</h2>
          <div className="video-container relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/your-video-id"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Explainer Video"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="become-specialist flex flex-col justify-center items-center py-10 md:py-16 bg-primary-9 text-white">
        <div className="w-full max-w-4xl p-4 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Become One of Our Specialists</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8">Join our team of expert specialists and help us deliver cutting-edge healthcare services.</p>
          <div className="flex justify-center">
            <Button
              borderRadius='rounded-full'
              background='bg-secondary-6 py-3 px-6'
              textColor='text-white text-lg'
              onClick={() => navigate(PATH.general.doctorSignUp)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      <section className='w-[90vw] sm:w-[95vw] md:w-[1000px] mx-auto'>
        <BlogCarousel blogs={blogs} visible={isMobile ? 1 : 3} />
      </section>
    </>
  );
};

export default Home;