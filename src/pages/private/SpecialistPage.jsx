import { useNavigate, useLocation } from 'react-router-dom';

const SpecialistPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const startCall = (callId) => {
    navigate(`/chat/${callId}`, { state: { from: location.pathname } });
  };

  // ... rest of the component
};

export default SpecialistPage;
