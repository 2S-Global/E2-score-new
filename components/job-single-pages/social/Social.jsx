"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Social = () => {

  //Get Token
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  if (!token) {
    console.log("No token");
  }

  const [socialProfiles, setSocialProfiles] = useState([]);

  //My Custom code
  useEffect(() => {
    const fetchSocialProfiles = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${apiurl}/api/companyprofile/get_social`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Here is my Social Profiles dandan !", response.data);

        if (response.data.success && response.status === 200) {
          setSocialProfiles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSocialProfiles();
  }, []);


  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  ];

  const iconMap = {
    facebook: "fa-facebook-f",
    twitter: "fa-twitter",
    instagram: "fa-instagram",
    linkedin: "fa-linkedin-in",
  };

  return (
    // <div className="social-links">
    //   {socialContent.map((item) => (
    //     <a
    //       href={item.link}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       key={item.id}
    //     >
    //       <i className={`fab ${item.icon}`}></i>
    //     </a>
    //   ))}
    // </div>

    <div className="social-links">
      {Object.entries(socialProfiles)
        .filter(([_, url]) => url) // show only non-empty links
        .map(([platform, url], index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.charAt(0).toUpperCase() + platform.slice(1)} // tooltip
          >
            <i className={`fab ${iconMap[platform] || "fa-globe"}`}></i>
          </a>
        ))}

      {Object.values(socialProfiles).every((url) => !url) && (
        <p>No social links available</p>
      )}
    </div>
  );
};

export default Social;