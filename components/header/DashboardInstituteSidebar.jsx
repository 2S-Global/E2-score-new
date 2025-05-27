"use client";

import Link from "next/link";
import employerMenuData from "../../data/InstituteMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname } from "next/navigation";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  // menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}
      <p
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: "20px",
          marginTop: "20px",
          backgroundColor: "#FF0000", // Set background color
          color: "white", // Set text color
          padding: "10px", // Optional: add some padding
          borderRadius: "5px", // Optional: rounded corners
        }}
      >
        Institute Panel
      </p>
      <div className="sidebar-inner">
        {/* Institute Panel heading */}

        {/* Navigation Menu */}
        <ul className="navigation">
          {employerMenuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, usePathname()) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              <Link href={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
