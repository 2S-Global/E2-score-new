import Address from "./Address";
import ContactForm from "./ContactForm";

const index = () => {
  return (
    <>
      <section className="about-section-three">
        <div className="auto-container">
          <div className="">
            <div className="row justify-content-center">
              <Address />
            </div>
            {/* End .row */}
          </div>

          {/* End upperbox */}

          {/* <!-- Contact Form --> */}
          <div className="contact-form default-form">
            <h3>Leave A Message</h3>
            <ContactForm />
            {/* <!--Contact Form--> */}
          </div>
          {/* <!--End Contact Form --> */}
        </div>
      </section>
      {/* <!-- Contact Section --> */}
    </>
  );
};

export default index;
