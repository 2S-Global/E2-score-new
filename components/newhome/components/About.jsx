import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column " data-aos="fade-left">
          <ul className="list-style-one">
            <li className="mb-2">
              Established in 2025, Global Employability Information Services
              India Limited is a pioneering information and HR solutions firm
              dedicated to building secure, high-performing workforces
              worldwide.
            </li>
            <li className="mb-2">
              We empower businesses to make informed, secure, and strategic
              decisions, ensuring that every hire is not just qualified, but
              also fully validated and compliant.
            </li>

            <li className="mb-2">
              We integrate advanced data analytics with critical verification
              services to transform how companies attract, vet, and hire talent.
              Our four core objectives define our commitment to global
              recruitment excellence and risk mitigation:
            </li>
          </ul>
         
        </div>
      </div>
      {/* End .col about left content */}

      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image" data-aos="fade-right">
          <Image
            width={600}
            height={600}
            src="/images/resource/image-2.png"
            alt="about"
          />
        </figure>
      </div>
      {/* <!-- Image Column --> */}
    </>
  );
};

export default About;
