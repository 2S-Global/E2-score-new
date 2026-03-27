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
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="#about">About</Link>
          </li>
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="#service">Services</Link>
          </li>
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <Link href="#clients">Clients</Link>
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
