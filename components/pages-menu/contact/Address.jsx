import Image from "next/image";

const Address = () => {
  const addressContent = [
    {
      id: 1,
      iconName: "placeholder",
      title: "Address",
      text: <> Kolkata | INDIA</>,
    },
    {
      id: 2,
      iconName: "smartphone",
      title: "Call Us",
      text: (
        <>
          <a href="tel:+9831823898" className="phone">
            9831823898
          </a>
        </>
      ),
    },
    {
      id: 3,
      iconName: "letter",
      title: "Email",
      text: (
        <>
          {" "}
          <a href="mailto:info@geisil.com">info@geisil.com</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div
          className="contact-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box text-center">
            <span className="icon">
              <Image
                width={51}
                height={51}
                src={`/images/icons/${item.iconName}.svg`}
                alt="icon"
              />
            </span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Address;
