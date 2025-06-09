import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";

const ProfileMain = ({ setReload, list = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState([]);

  const openModal = (Edit_item) => {
    if (Edit_item) {
      setItem(Edit_item);
      console.log("Selected Item:", item);
    } else {
      setItem([]);
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

        {/* dont render if list is empty */}
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item) => (
            <div key={item._id} className="mb-1" style={{ lineHeight: "1.4" }}>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: "2px",
                }}
              >
                {item.socialProfile}
                <span
                  onClick={() => openModal(item)}
                  style={{
                    cursor: "pointer",
                    color: "#275df5",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  ✎
                </span>
              </p>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  color: "#275df5",
                  fontWeight: 500,
                  marginBottom: "2px",
                }}
              >
                {item.url}
              </a>

              <p style={{ marginBottom: "2px" }}>{item.description}</p>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <ProfileModal
          show={isModalOpen}
          onClose={closeModal}
          setItem={setItem}
          item={item}
          setReload={setReload}
        />
      )}
    </>
  );
};

export default ProfileMain;
