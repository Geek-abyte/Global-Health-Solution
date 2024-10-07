import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageCard, PricingModal, CheckoutModal } from "../../../components";
import ModalContainer from "../../../components/ModalContainer";
import FindSpecialistModal from "../../../components/FindSpecialistModal";
import {
  showModal as showModalAction,
  hideModal,
} from "../../../states/popUpSlice";
import { PATH } from "../../../routes/path";
import { cards } from "../../../data/cards";
import { updateSpecialistCategory } from "../../../states/videoCallSlice";

const Specialist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const { showModal, modalContent } = useSelector((state) => state.popUp);
  const { currentSpecialistCategory } = useSelector((state) => state.videoCall);

  const onCardSelected = (category) => {
    dispatch(updateSpecialistCategory(category));
    dispatch(showModalAction({ content: "findSpecialistModal" }));
  };

  const closeModal = () => dispatch(hideModal());

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
        Consult a Specialist
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <ImageCard
              key={index}
              image={card.image}
              clickFunc={() => onCardSelected(card.specialty)}
              className="transition-transform duration-300 hover:scale-105"
            >
              {card.content}
            </ImageCard>
          ))}
        </div>
      </div>
      {showModal && modalContent === "findSpecialistModal" && (
        <ModalContainer
          modal={
            <FindSpecialistModal
              category={currentSpecialistCategory}
              setTheSpecialist={setSpecialist}
              closeModal={closeModal}
            />
          }
        />
      )}
      {showModal && modalContent === "pricingModal" && (
        <ModalContainer
          modal={
            <PricingModal
              closeModal={closeModal}
              setPrice={setPrice}
              setDuration={setDuration}
            />
          }
        />
      )}
      {showModal && modalContent === "checkoutModal" && (
        <ModalContainer modal={
          <CheckoutModal
            closeModal={closeModal}
            amount={price}
            currency="USD"
            // onSuccess={() => navigate(PATH.chat.setup)}
            specialist={specialist}
          />
        } />
      )}
    </section>
  );
};

export default Specialist;
