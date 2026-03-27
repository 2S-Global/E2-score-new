"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react"
import axios from "axios";
import html2canvas from "html2canvas";
import "react-quill-new/dist/quill.snow.css";
const About = () => {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(()=>{
  (async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/about/details`
      );
      if (response?.data?.data?.length>0) {
        setAbout(response.data.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  })()
  },[])
  return (
    <>
      <div className="sec-title " id="about">
            <h2 className="mb-4 text-center">
              {about?.title}
            </h2>
            <div className="row">
                <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                  <div className="inner-column ql-editor" data-aos="fade-left" dangerouslySetInnerHTML={{__html:about?.description}}> 
                  
                  </div>
                </div>
                {/* End .col about left content */}

                <div className="image-column col-lg-6 col-md-12 col-sm-12">
                  <figure className="image" data-aos="fade-right">
                    {about?.image && <Image
                      width={600}
                      height={600}
                      src={about?.image}
                      alt="about"
                    />}
                  </figure>
                </div>
                {/* <!-- Image Column --> */}
                
            </div>
        </div>
    </>
  );
};

export default About;
