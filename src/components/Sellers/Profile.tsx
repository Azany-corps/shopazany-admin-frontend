import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../Core/PopUp";
import LocationPopUp from "./LocationPopUp";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>

      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        <LocationPopUp />
      </PopUpModal>
    </div>
  );
};

export default Profile;
