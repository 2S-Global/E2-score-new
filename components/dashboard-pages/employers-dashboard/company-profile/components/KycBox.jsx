"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import MessageComponent from "@/components/common/ResponseMsg";
import CustomizedProgressBars from "@/components/common/loader";
import KycModal from "./madals/kycmodal";
import axios from "axios";
import RazorpayPayment from "./Razorpay";
const KycBox = () => {
  const [companyData, setCompanyData] = useState(null);
  const [focusSection, setFocusSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message_id, setMessageId] = useState(null);
  const [reload, setReload] = useState(false);
  const [sectionloading, setSectionloading] = useState(true);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");

  useEffect(() => {
    FetchData();
  }, [token]);

  useEffect(() => {
    if (reload) {
      FetchData();
      setReload(false);
    }
  }, [reload]);

  const FetchData = async () => {
    setSectionloading(true);
    try {
      const response = await axios.get(`${apiurl}/api/companykyc/kyc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCompanyData(response.data.kyc);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSectionloading(false);
    }
  };

  const openModalRH = (type) => {
    setFocusSection(type);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  const handelpaymentsuccess = async (response) => {
    setSectionloading(true);
    try {
      const res = await axios.post(
        `${apiurl}/api/companykyc/verify-order`,
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setError(null);
        setErrorId(null);
        setSuccess(res.data.verificationResult?.message || res.data.message);
        setMessageId(Date.now());
        setReload(true);

        console.log("✅ Verified Order:", res.data.order);
      } else {
        setError(res.data.message);
        setErrorId(Date.now());
      }
    } catch (error) {
      console.error("❌ Verification API Error:", error);
      setError("Failed to update KYC. Try again later.");
      setErrorId(Date.now());
    } finally {
      setSectionloading(false);
    }
  };
  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      {sectionloading ? (
        <CustomizedProgressBars />
      ) : (
        <>
          <div className="widget-title">
            <h4>KYC</h4>
            <i
              className="la la-pencil-alt"
              onClick={() => openModalRH("all")}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="widget-content">
            <div className="row">
              <div className="col-md-6 mb-4">
                {" "}
                <strong>Company CIN</strong>
                {companyData?.cin_number && (
                  <>
                    {companyData?.cin_verified ? (
                      <FaCheckCircle className="ms-2 text-success" />
                    ) : (
                      <>
                        {" "}
                        <FaRegCircleXmark className="ms-2 text-danger" />{" "}
                        <RazorpayPayment
                          onSuccess={handelpaymentsuccess}
                          documentType="cin"
                        />
                      </>
                    )}
                  </>
                )}
                <div>
                  <div className="mt-2">
                    {companyData?.cin_number ? (
                      <div
                        className="text-secondary"
                        style={{ lineHeight: 1.5 }}
                      >
                        <div>
                          <span className="fw-semibold">Name :</span>{" "}
                          {companyData?.cin_name || "N/A"}
                        </div>
                        <div>
                          <span className="fw-semibold">CIN Number:</span>{" "}
                          {companyData?.cin_number || "N/A"}
                        </div>
                      </div>
                    ) : (
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => openModalRH("cin")}
                      >
                        Add CIN info
                      </span>
                    )}
                  </div>
                </div>{" "}
              </div>
              <div className="col-md-6 mb-4">
                {" "}
                <strong>Company GSTIN</strong>
                {companyData?.gstin_number && (
                  <>
                    {companyData?.gstin_verified ? (
                      <FaCheckCircle className="ms-2 text-success" />
                    ) : (
                      <>
                        {" "}
                        <FaRegCircleXmark className="ms-2 text-danger" />{" "}
                        <RazorpayPayment
                          onSuccess={handelpaymentsuccess}
                          documentType="gstin"
                        />
                      </>
                    )}
                  </>
                )}
                <div>
                  <div className="mt-2">
                    {companyData?.gstin_number ? (
                      <div
                        className="text-secondary"
                        style={{ lineHeight: 1.5 }}
                      >
                        <div>
                          <span className="fw-semibold">Name :</span>{" "}
                          {companyData?.gstin_name || "N/A"}
                        </div>
                        <div>
                          <span className="fw-semibold">GSTIN Number:</span>{" "}
                          {companyData?.gstin_number || "N/A"}
                        </div>
                      </div>
                    ) : (
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => openModalRH("gstin")}
                      >
                        Add GSTIN info
                      </span>
                    )}
                  </div>
                </div>{" "}
              </div>
              <div className="col-md-6 mb-4">
                {" "}
                <strong>Company PAN</strong>
                {companyData?.pan_number && (
                  <>
                    {companyData?.pan_verified ? (
                      <FaCheckCircle className="ms-2 text-success" />
                    ) : (
                      <>
                        {" "}
                        <FaRegCircleXmark className="ms-2 text-danger" />{" "}
                        <RazorpayPayment
                          onSuccess={handelpaymentsuccess}
                          documentType="pan"
                        />
                      </>
                    )}
                  </>
                )}
                <div>
                  <div className="mt-2">
                    {companyData?.pan_number ? (
                      <div
                        className="text-secondary"
                        style={{ lineHeight: 1.5 }}
                      >
                        <div>
                          <span className="fw-semibold">Name :</span>{" "}
                          {companyData?.pan_name || "N/A"}
                        </div>
                        <div>
                          <span className="fw-semibold">PAN Number:</span>{" "}
                          {companyData?.pan_number || "N/A"}
                        </div>
                      </div>
                    ) : (
                      <span
                        className="text-primary fw-bold"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => openModalRH("pan")}
                      >
                        Add PAN info
                      </span>
                    )}
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <KycModal
          show={isModalOpen}
          onClose={closeModalRH}
          setError={setError}
          setSuccess={setSuccess}
          setMessageId={setMessageId}
          setErrorId={setErrorId}
          setReload={setReload}
          focusSection={focusSection}
          data={companyData}
        />
      )}
    </>
  );
};

export default KycBox;
