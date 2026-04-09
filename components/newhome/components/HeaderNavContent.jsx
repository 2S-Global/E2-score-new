"use client";

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
  about,
  contact,
} from "../../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const HeaderNavContent = () => {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120; // adjust this
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <>
      <nav className="nav main-menu">
        <ul
          className=" navigation d-flex justify-content-center align-items-center gap-3"
          id="navbar"
        >
          {/* current dropdown */}
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="/home">Home</Link>
          </li>
          <li className="dropdown">
            <a onClick={() => scrollToSection("about")}>About</a>
          </li>
          <li className="dropdown">
            <a onClick={() => scrollToSection("service")}>Services</a>
          </li>
          <li className="dropdown">
            <a onClick={() => scrollToSection("clients")}>Clients</a>
          </li>
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="#testimonials">Testimonials</Link>
          </li>
          {/*   <li className="dropdown">
            <Link href="#app-section">App</Link>
          </li> */}
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="#contact">Contact</Link>
          </li>

          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
