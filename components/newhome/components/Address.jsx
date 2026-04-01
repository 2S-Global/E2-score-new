"use client";
import Image from "next/image";
import {useEffect,useState} from "react"
import axios from "axios";
const Address = () => {
   const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(()=>{
  (async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/contact/all`
      );
      if (response?.data?.data?.length>0) {
        let tel="tel:"+response?.data?.data[0]?.phone
        let mailto="mailto:"+response?.data?.data[0]?.email
        const addressContent = [
                          {
                            id: 1,
                            iconName: "placeholder",
                            title: "Address",
                            text: <> {response?.data?.data[0]?.address}</>,
                          },
                          {
                            id: 2,
                            iconName: "smartphone",
                            title: "Call Us",
                            text: (
                              <>
                                <a href={tel} className="phone">
                                  {response?.data?.data[0]?.phone}
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
                                <a href={mailto}>{response?.data?.data[0]?.email}</a>
                              </>
                            ),
                          },
                ];
        setContact(addressContent);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  })()
  },[])
  return (
    <>
      {contact.map((item) => (
        <div
          className="contact-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box text-center">
            <span className="icon">
              <Image
                width={51}
                height={51}
                src={`/images/icons/${item?.iconName}.svg`}
                alt="icon"
              />
            </span>
            <h4>{item?.title}</h4>
            <p>{item?.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Address;
