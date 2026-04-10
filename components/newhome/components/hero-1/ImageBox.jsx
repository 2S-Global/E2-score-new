import Image from "next/image";

const ImageBox = ({ data }) => {
  return (
    <div className="image-box">
      <figure className="main-image" data-aos="fade-in" data-aos-delay="500">
        {data?.bannerImage && (
          <Image
            src={data.bannerImage}
            alt="hero image"
            width={486}
            height={589}
            className="w-full h-auto"
          />
        )}
      </figure>
    </div>
  );
};

export default ImageBox;
