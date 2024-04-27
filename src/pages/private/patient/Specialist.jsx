import React, { useEffect } from 'react'
import { cards } from '../../../data/cards'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useDispatch, useSelector } from 'react-redux'
import { ImageCard } from '../../../components'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { showModal as showModalAction, hideModal } from '../../../states/popUpSlice';
import ModalContainer from '../../../components/ModalContainer';
import { MdOutlineClose } from 'react-icons/md';
import { PATH } from '../../../routes/path';

const Specialist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal, modalContent } = useSelector((state) => state.popUp);

  const closeModal = () => {
    dispatch(hideModal())
  }
  
  const handleGoToDoctor = () => {
    navigate(PATH.chat.default)
  }

  // modals

  const pricingModal = (
    <div className="bg-gray-100 py-16 px-16 ">
      <MdOutlineClose className='absolute right-4 top-4' size={40} onClick={closeModal} />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
          <p className="text-gray-600">Choose a plan that suits your needs.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Basic Consultation</h3>
                <p className="text-gray-600 mb-4">30-minute call with a consultant</p>
                <p className="text-gray-600 mb-8">Ideal for quick inquiries and basic guidance</p>
                <div className="text-4xl font-bold text-gray-800 mb-4">$49.99</div>
                <button onClick={handleGoToDoctor} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Extended Consultation</h3>
                <p className="text-gray-600 mb-4">45-minute call with a consultant</p>
                <p className="text-gray-600 mb-8">Ideal for more in-depth discussions and problem-solving</p>
                <div className="text-4xl font-bold text-gray-800 mb-4">$79.99</div>
                <button onClick={handleGoToDoctor} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Premium Consultation</h3>
                <p className="text-gray-600 mb-4">60-minute call with a consultant</p>
                <p className="text-gray-600 mb-8">Ideal for comprehensive analysis and strategic planning</p>
                <div className="text-4xl font-bold text-gray-800 mb-4">$99.99</div>
                <button onClick={handleGoToDoctor} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section>
      <h1 className='text-center text-[32px] p-[20px] font-extrabold'>Consult a specialist</h1>
      <div className='w-full mx-auto flex flex-row gap-8 flex-wrap justify-center items-center p-[20px]'>
        {cards.map((card, index) => (
          <ImageCard key={index} image={card.image} clickFunc={() => dispatch(showModalAction({ content: "pricingModal" }))}>{card.content}</ImageCard>
        ))}
      </div>
      {showModal && modalContent === "pricingModal" && (
        <ModalContainer modal={pricingModal} />
      )}
    </section>
  )
}




export default Specialist