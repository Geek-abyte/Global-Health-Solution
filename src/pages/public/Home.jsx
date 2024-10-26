import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaStethoscope, FaAmbulance, FaArrowRight, FaRobot, FaUserMd, FaVideo, FaPills, FaClipboardList } from 'react-icons/fa';
import { consult, doctorIcon, medicMask, pngwing1, roboDoc, userIcon } from '../../assets';
import { Button, ChatBot } from '../../components';
import TypewriterEffect from '../../components/TypewriterEffect';
import { useNavigate } from 'react-router';
import { PATH } from '../../routes/path';
import { cards } from '../../data/cards';
import { blogs } from '../../data/blogs';
import { Link } from 'react-router-dom';
import SimpleCarousel from '../../components/SimpleCarousel';
import { useMediaQuery } from 'react-responsive'; // Add this import

const ServiceCard = ({ icon, title, description, index }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
  >
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-primary-10 text-center mb-2">{title}</h3>
    <p className="text-gray-600 text-center mb-4">{description}</p>
    <div className="flex justify-center space-x-4">
      <Button
        className="text-sm"
        borderRadius="rounded-full"
        background="bg-primary-6"
        textColor="text-white"
        onClick={() => console.log(`Consult Doctor for ${title}`)}
      >
        Consult Doctor
      </Button>
      <Button
        className="text-sm"
        borderRadius="rounded-full"
        background="bg-secondary-6"
        textColor="text-white"
        onClick={() => console.log(`Use AI for ${title}`)}
      >
        Use AI
      </Button>
    </div>
  </motion.div>
);

const OptionCard = ({ icon, title, description, buttonText, onClick, color }) => (
  <motion.div
    className={`bg-white rounded-lg shadow-lg p-6 relative overflow-hidden ${color} text-white`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex justify-center mb-4 text-6xl">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-center mb-4">{title}</h3>
    <p className="text-center mb-6">{description}</p>
    <div className="flex justify-center">
      <Button
        className="text-lg font-semibold"
        borderRadius="rounded-full"
        background="bg-white"
        textColor={`${color.replace('bg-', 'text-')}`}
        onClick={onClick}
      >
        {buttonText} <FaArrowRight className="ml-2 inline" />
      </Button>
    </div>
  </motion.div>
);

const InteractiveChoice = () => {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const options = [
    {
      name: 'AI',
      image: roboDoc,
      title: 'AI Health Assistant',
      description: 'Get instant health insights powered by advanced AI',
      action: () => navigate(PATH.general.aiChat),
      color: 'bg-cyan-500',
      icon: <FaRobot className="text-4xl" />,
    },
    {
      name: 'Consultant',
      image: consult,
      title: 'Consultant',
      description: 'Connect with experienced healthcare professionals',
      action: () => navigate(PATH.general.findDoctor),
      color: 'bg-pink-500',
      icon: <FaUserMd className="text-4xl" />,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-8 mt-8 py-32 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-center gap-8`}>
          {options.map((option) => (
            <motion.div
              key={option.name}
              className={`relative ${isMobile ? 'w-64 h-64' : 'w-72 h-72'} rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-lg`}
              whileHover={{ scale: 1.05 }}
              onClick={option.action}
            >
              <motion.img
                src={option.image}
                alt={option.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: hoveredOption === option.name ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredOption(option.name)}
                onHoverEnd={() => setHoveredOption(null)}
              >
                <div className={`${option.color} rounded-full p-4 mb-2`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{option.title}</h3>
                <p className="text-sm text-center mb-3">{option.description}</p>
                <Button
                  className="text-sm font-semibold"
                  borderRadius="rounded-full"
                  background={option.color}
                  textColor="text-white"
                  onClick={option.action}
                >
                  Choose {option.name}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: hoveredOption === 'AI'
              ? 'radial-gradient(circle at 25% 50%, rgba(0,255,255,0.2) 0%, rgba(0,0,0,0) 50%)'
              : hoveredOption === 'Doctor'
                ? 'radial-gradient(circle at 75% 50%, rgba(255,105,180,0.2) 0%, rgba(0,0,0,0) 50%)'
                : 'none'
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const iconlist = ['Medical Tourism Solutions', 'Medical Equipment', 'Air Ambulance Services'];
  const services = [
    {
      icon: <FaPlane className="text-5xl text-primary-6" />,
      title: "Medical Tourism Solutions",
      description: "Tailored healthcare travel packages for international patients",
      animation: "M10 10 L50 50 L90 10",
    },
    {
      icon: <FaStethoscope className="text-5xl text-primary-6" />,
      title: "Medical Devices and Equipment",
      description: "State-of-the-art medical devices and supplies for healthcare facilities",
      animation: "M10 50 Q50 10 90 50 Q50 90 10 50",
    },
    {
      icon: <FaClipboardList className="text-5xl text-primary-6" />,
      title: "Laboratory Referral Services",
      description: "Streamlined access to advanced diagnostic testing",
      animation: "M10 30 Q50 60 90 30 Q50 0 10 30",
    },
  ];

  const renderServiceCard = (card) => (
    <div key={card.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative h-48">
        <img src={card.image} alt={card.content} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="text-white font-bold text-xl p-4">{card.content}</h3>
        </div>
      </div>
    </div>
  );

  const renderBlogPost = (blog) => (
    <div key={blog.id} className="w-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[320px] flex flex-col">
        <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg mb-2 text-primary-10 line-clamp-2">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-2 flex-grow overflow-hidden line-clamp-2">{blog.content}</p>
          <Link to={blog.link} className="text-secondary-6 font-semibold hover:underline inline-flex items-center mt-auto">
            Read More <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );

  const serviceTitles = ['Free AI Diagnosis', ...services.map(service => service.title)];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    // You can add more logic here, like opening a modal or navigating to a service page
    console.log(`Selected service: ${service}`);
  };

  return (
    <>
      <ChatBot />
      <section className="Hero relative min-h-screen bg-gradient-to-b from-primary-6 to-white transition-colors overflow-hidden flex items-center">
        <div className="intro-text p-6 sm:p-10 md:pl-20 flex flex-col justify-center items-start text-left w-full max-w-3xl z-10">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            <span className="bg-gradient-to-r from-white to-secondary-1 text-transparent bg-clip-text">Step into the next generation</span>
            <span className="text-white block mt-2">Healthcare Services</span>
            <span className="text-secondary-1 block mt-2">with our</span>
          </h1>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
            <TypewriterEffect words={serviceTitles} typingSpeed={100} erasingSpeed={50} delayBetweenWords={2000} />
          </div>
          <Button
            className="transition-all py-8 px-8 duration-300 hover:scale-105 hover:shadow-xl mt-4 text-lg sm:text-xl font-bold relative overflow-hidden group flex items-center justify-center"
            borderRadius='rounded-small'
            border="border-2 border-white rounded-lg"
            background='bg-gradient-to-r from-primary-6 to-primary-8'
            textColor='text-white'
            onClick={() => navigate(PATH.general.signUp)}
          >
            <span className="relative z-10">Sign Up for Free</span>
          </Button>
        </div>
        <img src={roboDoc} alt="robo doctor" className="absolute right-0 bottom-0 w-xs max-w-lg opacity-30 md:opacity-100" />
      </section>

      <section className="services-section py-8 bg-white">
        <div className="container mx-auto mt-16 px-4">
          <SimpleCarousel items={cards.map(renderServiceCard)} autoplay={true} autoplayInterval={2000} />
          <div className="text-center mt-12">
            <Button
              className="py-6 px-8 text-lg mx-auto hover:shadow-lg transition-all duration-300"
              borderRadius="rounded-full"
              background="bg-secondary-6"
              textColor="text-white"
              onClick={() => navigate(PATH.general.signUp)}
            >
              Our Consultants
            </Button>
          </div>
        </div>
      </section>

      <section className="comprehensive-services py-20 bg-white text-white mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-10 text-center mb-2">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
                <motion.svg
                  className="absolute bottom-0 left-0 w-full h-12 text-primary-1 opacity-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d={service.animation}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </motion.svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveChoice />

      <section className="explainer-video py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-10">Our Services Explained</h2>
          <div className="max-w-4xl mx-auto">
            <div className="video-container relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/your-video-id"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Explainer Video"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="become-specialist py-20 bg-primary-9 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become One of Our Specialists</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our team of expert specialists and help us deliver cutting-edge healthcare services.</p>
          <Button
            className="py-3 px-8 text-lg hover:shadow-lg mx-auto transition-all duration-300"
            borderRadius='rounded-full'
            background='bg-secondary-6'
            textColor='text-white'
            onClick={() => navigate(PATH.general.doctorSignUp)}
          >
            Apply Now
          </Button>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-10">Latest Blog Posts</h2>
          <SimpleCarousel items={blogs.map(renderBlogPost)} autoplay={true} autoplayInterval={7000} />
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center text-secondary-6 font-semibold text-lg hover:underline"
            >
              View All Posts <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="feedback-section bg-primary-6 py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-10">We Value Your Feedback</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your opinion matters! Help us improve our services by sharing your thoughts and experiences.
            </p>
            <Button
              className="py-4 px-10 text-lg mx-auto font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              borderRadius="rounded-full"
              background="bg-secondary-6"
              textColor="text-white"
              onClick={() => navigate(PATH.general.feedback)}
            >
              Share Your Feedback
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;