import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
const ProfileMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(null);

  const openModal = (Edit_item) => {
    if (Edit_item) {
      setItem(Edit_item);
      console.log("Selected Item:", item);
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  return (
    <>
      <div className="accomplishment-item">
        <h5>
          Online Profile
          <span
            onClick={() => openModal()}
            style={{
              cursor: "pointer",
              float: "right",
              color: "#275df5",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Add
          </span>
        </h5>
        <p>Add link to online professional profiles (e.g. LinkedIn, etc.)</p>
      </div>

      {isModalOpen && (
        <ProfileModal
          show={isModalOpen}
          onClose={closeModal}
          setItem={setItem}
          item={item}
        />
      )}
    </>
  );
};

export default ProfileMain;
