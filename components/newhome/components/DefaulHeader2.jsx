"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent.jsx";
import Image from "next/image";
import axios from "axios";
const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(true);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token") ||
        localStorage.getItem("employer_token") ||
        localStorage.getItem("Institute_token") ||
        localStorage.getItem("Super_token")
      : null;

  const [image, setImage] = useState("/images/resource/no_user.png");

  const fetchimage = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/userdata/get_candidate_img`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setImage(response.data.data.profilePicture);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchimage();
    }
  }, [token]);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  alt="brand"
                  src="/images/Logo3.png"
                  width={154}
                  height={60}
                  style={{ height: "60px" }}
                  priority
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        <div className="outer-box">
          {/* <!-- Dashboard Option --> */}
          {token ? (
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt="avatar"
                  className="thumb"
                  src={image}
                  width={50}
                  height={50}
                />
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                <li className={`mb-1`} key={0}>
                  <Link href="/">
                    <i
                      className="la la-home
                    "
                      aria-hidden="true"
                    ></i>
                    Dashboard
                  </Link>
                </li>{" "}
                <li className={` mb-1`} key={3}>
                  <Link href="/" onClick={() => localStorage.clear()}>
                    <i className="la la-sign-out" aria-hidden="true"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2 "
            >
              Log in
            </button>
          )}

          {/* End dropdown */}
        </div>
        {/* End outer-box */}
      </div>
    </header>
  );
};

export default DefaulHeader2;
