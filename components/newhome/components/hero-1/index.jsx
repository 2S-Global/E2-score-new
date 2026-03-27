"use client";
import ImageBox from "./ImageBox";
import {useEffect,useState} from "react"
import axios from "axios";
const index = () => {
   const [loading, setLoading] = useState(false);
  const [homeBanner, sethomeBanner] = useState(null);
   const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(()=>{
  (async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/home/get-banner-details`
      );
      if (response.data.success) {
        sethomeBanner(response.data.data[0]);
        
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  })()
  },[])
  return (
    <section className="banner-section">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div
              className="inner-column"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="title-box">
                <h3>
                 {loading ?'loading...........' :homeBanner?.title}
                </h3>
              {/*   <div className="text">
                  Find Jobs, Employment & Career Opportunities
                </div> */}
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="image-column col-lg-5 ">
            <ImageBox data={homeBanner}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
