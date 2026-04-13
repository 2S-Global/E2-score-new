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
        const response = await axios.get(`${apiurl}/api/home/all-banner`);

        if (response.data) {
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
            <SwiperSlide key={item._id || index}>
              <div className="auto-container">
                <div className="row">
                  <div className="content-column col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="title-box">
                        {/* ✅ FIXED */}
                        <h3>{item?.banner_title}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
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
