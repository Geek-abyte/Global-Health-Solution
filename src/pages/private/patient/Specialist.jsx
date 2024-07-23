import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageCard, PricingModal } from '../../../components';
import ModalContainer from '../../../components/ModalContainer';
import { showModal as showModalAction, hideModal } from '../../../states/popUpSlice';
import { MdOutlineClose } from 'react-icons/md';
import { PATH } from '../../../routes/path';
import { cards } from '../../../data/cards';
import { updateSpecialistCategory } from '../../../states/videoCallSlice';

const Specialist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal, modalContent } = useSelector((state) => state.popUp);

  const onCardSelected = (category) => {
    dispatch(updateSpecialistCategory(category));
    dispatch(showModalAction({ content: "pricingModal" }))
  }

  const closeModal = () => dispatch(hideModal());
  const handleGoToDoctor = () => {
    navigate(PATH.chat.default);
  }

  const PricingCard = ({ title, description, duration, price }) => (
    <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="px-6 py-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 mb-4">{duration}</p>
          <p className="text-gray-600 mb-8">{description}</p>
          <div className="text-4xl font-bold text-gray-800 mb-4">${price}</div>
          <button 
            onClick={handleGoToDoctor} 
            className="bg-primary-6 hover:bg-primary-7 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <h1 className='text-center text-3xl md:text-4xl font-extrabold mb-12 text-gray-800'>Consult a Specialist</h1>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {cards.map((card, index) => (
            <ImageCard 
              key={index} 
              image={card.image} 
              clickFunc={() => onCardSelected(card.content)}
              className="transition-transform duration-300 hover:scale-105"
            >
              {card.content}
            </ImageCard>
          ))}
        </div>
      </div>
      {showModal && modalContent === "pricingModal" && (
        <ModalContainer modal={<PricingModal closeModal={closeModal}/>} />
      )}
    </section>
  );
};

export default Specialist;