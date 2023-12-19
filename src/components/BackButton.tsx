import { useNavigate } from "react-router-dom";
import "../scss/back-button.scss";
import { FaArrowLeft } from "react-icons/fa";
import { FC } from "react";

interface LocationProps {
  location: string;
}

const BackButton: FC<LocationProps> = ({ location }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(location);
  };
  return (
    <button className="back-button" onClick={handleBackClick}>
      <FaArrowLeft className="icon" style={{ color: "white" }} />
    </button>
  );
};

export default BackButton;
