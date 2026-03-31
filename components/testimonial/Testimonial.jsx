"use client";
import Image from "next/image";
import Slider from "react-slick";
import {useEffect,useState} from "react"
import axios from "axios"
const Testimonial = () => {
const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(()=>{
  (async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/testimonials/all-testimonial`
      );
      if (response?.data?.data?.length>0) {
        let Data=response?.data?.data?.map((item)=>({...item,readMore:false}))
        setTestimonials(Data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  })()
  },[])


function ReadMore(row) {  
  const shortText = row?.description?.slice(0, 50); // show first 100 characters
  return (
    <>
      {row?.readMore ? row?.description+"  " : shortText}
      {row?.description?.length>50?<button onClick={() => setTestimonials((pre)=>pre.map((item)=>item?._id===row?._id?({...item,readMore:!item.readMore}):item))}>
        {row?.readMore ? "Read Less" : "...Read More"}
      </button>:""}
    </>
  );
}

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    center: true,
  };
  return (
    <>
      {loading?' loading............ ':<Slider {...settings} arrows={false}>
        {testimonials?.map((item) => (
          <div className="testimonial-block" key={item?._id}>
            <div className="inner-box">
              <h4 className="title">{item?.subject}</h4>
              <div className="text">{ReadMore(item)}</div>
              <div className="info-box">
                <div >
                  <img
                    loading="lazy"
                    className="thumb"
                    src={item?.customer_image?item?.customer_image:"/images/resource/no_user.png"}
                    alt="testimonial"
                  />
                </div>
                <h4 className="name">{item?.customer_name}</h4>
                <span className="designation">{item?.customer_designation}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>}
    </>
  );
};

export default Testimonial;
