import Link from "next/link";
import About from "./components/About";
import Services from "./components/service";
import AppSection from "./components/AppSection";

import ContactSection from "./components/Contact";
import Partner from "./components/Partner";
import CopyrightFooter from "./components/CopyrightFooter";

import DefaulHeader2 from "./components/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
//import Hero1 from "../hero/hero-1";
import Hero1 from "./components/hero-1";

import Testimonial from "../testimonial/Testimonial";

const index = () => {
  return (
    <>
      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero1 />
      {/* End Hero Section */}

      <section className="job-categories ui-job-categories">
        <div className="auto-container">
          <div className="sec-title " id="about">
            <h2 className="mb-4 text-center">
              {" "}
              💡 About Global Employability Information Services India
              Limited{" "}
            </h2>

            <div className="row">
              <About />
            </div>
          </div>

          <div className="sec-title " id="service">
            <h2 className="mb-4 text-center">Our Services</h2>

            <div className="row">
              <Services />
            </div>
          </div>
          <section className="sec-title " id="clients">
            <h2 className="mb-2 text-center">Our Clients</h2>
            <div className="sponsors-outer" data-aos="fade">
              {/* <!--Sponsors Carousel--> */}
              <ul className="sponsors-carousel">
                <Partner />
              </ul>
            </div>
          </section>
          <section className="testimonial-section" id="testimonials">
            <div className="container-fluid">
              {/* <!-- Sec Title --> */}
              <div className="sec-title text-center">
                <h2>Testimonials From Our Customers</h2>
               {/*  <div className="text">
                  Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
                </div> */}
              </div>
            </div>
            <div className="carousel-outer" data-aos="fade-up">
              {/* <!-- Testimonial Carousel --> */}
              <div className="testimonial-carousel gap-x25 center-item-active slick-list-visible">
                <Testimonial />
              </div>
            </div>
          </section>
        {/*   <section className="app-section" id="app-section">
            <div className="auto-container">
              <AppSection />
            </div>
          </section> */}

          <section className="app-section" id="contact">
            <h2 className="mb-4 text-center">Contact</h2>
            <div className="auto-container">
              <ContactSection />
            </div>
          </section>
        </div>
      </section>

      <CopyrightFooter />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
