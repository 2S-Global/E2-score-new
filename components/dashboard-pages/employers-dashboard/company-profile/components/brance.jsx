"use client";
import React, { useState } from "react";
import BranchModal from "./madals/branchModal";

const BranchBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  const Branch = [
    {
      name: "Kolkata Branch",
      address: "123 Main St",
      country: "India",
      city: "Kolkata",
    },
    {
      name: "Mumbai Branch",
      address: "456 Elm St",
      country: "India",
      city: "Mumbai",
    },
    {
      name: "Delhi Branch",
      address: "789 Oak St",
      country: "India",
      city: "Delhi",
    },
  ];
  return (
    <>
      <div className="widget-title">
        <h4>Branch Information</h4>
        <span
          onClick={openModalRH}
          style={{
            cursor: "pointer",
            float: "right",
            color: "#275df5",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Add details
        </span>
      </div>

      <div className="widget-content">
        <table className="table">
          <thead>
            <tr className="border-bottom">
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Address</th>
              <th className="border-bottom">Country</th>
              <th className="border-bottom">City</th>
              <th className="border-bottom"></th>
            </tr>
          </thead>
          <tbody>
            {Branch.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>
                <td>{skill.address}</td>
                <td>{skill.country}</td>
                <td>{skill.city}</td>
                <td>
                  {" "}
                  <i
                    onClick={openModalRH}
                    className="la la-pencil-alt"
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <BranchModal show={isModalOpen} onClose={closeModalRH} />}
    </>
  );
};

export default BranchBox;
