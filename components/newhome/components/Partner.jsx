"use client";

import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";

const Partner = () => {
  const [sliderGallery, setSliderGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/clients/all-client`,
        );

        const filtered = response.data.data.filter((item) => !item.is_del);

        setSliderGallery(filtered);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {sliderGallery.map((item, index) => (
          <div key={item._id || index} style={{ padding: "0 14px" }}>
            <figure
              className="image-box"
              style={{
                background: "#fff",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
                width: "100px",
                margin: "0 auto",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <a
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={item.image}
                  alt="brand"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "contain",
                    width: "85%", // 👈 bigger logo
                    height: "85%",
                  }}
                />
              </a>
            </figure>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Partner;
