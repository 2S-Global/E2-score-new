import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { forEach } from "@/data/blogs";
const CardPaymentForm = ({ show, onClose, mainamount }) => {
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [amount, setAmount] = useState(mainamount);
    const [token, setToken] = useState(null);
    const [payments, setPayments] = useState([]);
    const apiurl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem("Admin_token");
        setToken(storedToken);
    }, []);



    const handlePayNow = async () => { // Add 'async' here
        try {
            const response = await axios.get(`${apiurl}/api/usercart/list_user_cart_all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setPayments(response.data.data);
                console.log("Updated Payments:", response.data.data);

                response.data.data.forEach(async (payment) => {
                    //console.log("PAN Name:", payment.pan_name);

                    if (payment.pan_name && payment.pan_number) {
                        let customer_pan_number = payment.pan_number;
                        let pan_name = payment.pan_name;
                        let id = payment._id;
                        console.log(
                            `Payment ID: ${id}, Customer PAN Number: ${customer_pan_number}, PAN Name: ${pan_name}`
                        )
                        //api call
                        /*                         let pan_response = await axios.post(
                                                    `${apiurl}/api/verify/verifyPAN`,
                                                    {
                                                        customer_pan_number,
                                                        pan_name,
                                                        id
                                                    },
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    }
                                                );
                                                console.log("PAN Verify Response:", pan_response.data); */
                    }

                    if (payment.aadhar_name && payment.aadhar_number) {
                        let candidate_aadhaar_number = payment.aadhar_number;
                        let id = payment._id;
                        let aadhar_name = payment.aadhar_name;
                        console.log(
                            `Payment ID: ${id}, Candidate Aadhaar Number: ${candidate_aadhaar_number}, Aadhaar Name: ${aadhar_name}`
                        )

                        //api call
                        let adhar_response = await axios.post(
                            `${apiurl}/api/verify/verifyAadhaar`,
                            {
                                candidate_aadhaar_number,
                                id,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log("Aadhaare Verify Response:", adhar_response.data);
                    }













                });
















            } else {
                setError("Failed to fetch data.");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    if (!show) return null;

    return (
        <>
            <style>
                {`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }
      .suggestion-btn {
            
            bottom: -0px;
            left: 10;
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #e8f0fe;
            color: #1a73e8;
            border-radius: 20px;
            padding: 6px 12px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          .suggestion-btn:hover {
            background-color: #d2e3fc;
          }

          .suggestion-btn svg {
            width: 16px;
            height: 16px;
          }
`}
            </style>
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">Card Payment</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            {/* Textarea Input */}
                            <div className="container">
                                <h5 className="mb-3">Input Your Card Details</h5>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Card Holder Name"
                                    value={cardHolder}
                                    onChange={(e) => setCardHolder(e.target.value)}
                                />

                                <div className="row">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Card Number (16 digits)"
                                            maxLength="16"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="password"
                                            className="form-control mb-3"
                                            placeholder="CVV"
                                            maxLength="3"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <div className="d-flex justify-content-start">
                                <button className="btn btn-primary me-2" onClick={handlePayNow}>
                                    Pay Now (INR {amount})
                                </button>
                                <button className="btn btn-secondary" onClick={onClose}>
                                    Back
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

};

export default CardPaymentForm;
