"use client";

import ImageBox from "./ImageBox";
import { useEffect, useState } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [homeBanner, sethomeBanner] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiurl}/api/home/get-banner-details`,
        );

        if (response.data.success) {
          sethomeBanner(response.data.data); // ✅ multiple banners
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className="banner-section w-full">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
        >
          {homeBanner.map((item, index) => (
            <SwiperSlide key={index}>
              {/* 🔥 YOUR SAME DESIGN */}
              <div className="auto-container">
                <div className="row">
                  <div className="content-column col-lg-7 col-md-12 col-sm-12">
                    <div
                      className="inner-column"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <div className="title-box">
                        <h3>{item?.title}</h3>
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-5">
                    <ImageBox data={item} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Index;
