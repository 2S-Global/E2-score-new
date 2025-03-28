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

                    let verificationPromises = [];

                    if (payment.pan_name && payment.pan_number) {
                        let customer_pan_number = payment.pan_number;
                        let pan_name = payment.pan_name;
                        let id = payment._id;

                        console.log(`Payment ID: ${id}, Customer PAN Number: ${customer_pan_number}, PAN Name: ${pan_name}`);

                        verificationPromises.push(
                            axios.post(`${apiurl}/api/verify/verifyPAN`, {
                                customer_pan_number,
                                pan_holder_name: pan_name,
                                id,
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            }).then(response => console.log("PAN Verify Response:", response.data))
                                .catch(error => console.error("PAN Verification Failed:", error.message))
                        );
                    }

                    if (payment.aadhar_name && payment.aadhar_number) {
                        let candidate_aadhaar_number = payment.aadhar_number;
                        let id = payment._id;
                        let aadhar_name = payment.aadhar_name;

                        console.log(`Payment ID: ${id}, Candidate Aadhaar Number: ${candidate_aadhaar_number}, Aadhaar Name: ${aadhar_name}`);

                        verificationPromises.push(
                            axios.post(`${apiurl}/api/verify/verifyAadhaar`, {
                                customer_aadhaar_number: candidate_aadhaar_number,
                                id,
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            }).
                                then(response =>
                                    console.log("Aadhaar Verify Response:", response.data)
                                )
                                .catch(error => console.error("Aadhaar Verification Failed:", error.message))
                        );
                    }

                    if (payment.dl_name && payment.dl_number && payment.candidate_dob) {
                        let customer_dl_number = payment.dl_number;
                        let name_to_match = payment.dl_name;
                        let candidate_dob_og = payment.candidate_dob;
                        let dob = new Date(candidate_dob_og);
                        let customer_dob = `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1).toString().padStart(2, '0')}-${dob.getFullYear()}`;
                        let id = payment._id;

                        console.log(`Payment ID: ${id}, Customer DL Number: ${customer_dl_number}, DL Name: ${name_to_match}, Candidate DOB: ${customer_dob}`);

                        verificationPromises.push(
                            axios.post(`${apiurl}/api/verify/verifyDL`, {
                                id,
                                customer_dl_number,
                                name_to_match,
                                customer_dob
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            }).then(response => console.log("DL Verify Response:", response.data))
                                .catch(error => console.error("DL Verification Failed:", error.message))
                        );
                    }

                    if (payment.epic_name && payment.epic_number) {
                        let epic_number = payment.epic_number;
                        let id = payment._id;
                        let epic_name = payment.epic_name;

                        console.log(`Payment ID: ${id}, Epic Number: ${epic_number}, Epic Name: ${epic_name}`);

                        verificationPromises.push(
                            axios.post(`${apiurl}/api/verify/verifyEPIC`, {
                                id,
                                customer_epic_number: epic_number,
                                name_to_match: epic_name
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            }).then(response => console.log("Epic Verify Response:", response.data))
                                .catch(error => console.error("EPIC Verification Failed:", error.message))
                        );
                    }

                    if (payment.passport_name && payment.passport_file_number && payment.candidate_dob) {
                        let customer_file_number = payment.passport_file_number;
                        let candidate_name = payment.passport_name;
                        let id = payment._id;
                        let candidate_dob_og = payment.candidate_dob;
                        let dob = new Date(candidate_dob_og);
                        let candidate_dob = `${dob.getDate().toString().padStart(2, '0')}-${(dob.getMonth() + 1).toString().padStart(2, '0')}-${dob.getFullYear()}`;

                        console.log(`Payment ID: ${id}, Customer Passport Number: ${customer_file_number}, Candidate Name: ${candidate_name}, Candidate DOB: ${candidate_dob}`);

                        verificationPromises.push(
                            axios.post(`${apiurl}/api/verify/verifyPassport`, {
                                id,
                                customer_file_number,
                                name_to_match: candidate_name,
                                customer_dob: candidate_dob
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            }).then(response => console.log("Passport Verify Response:", response.data))
                                .catch(error => console.error("Passport Verification Failed:", error.message))
                        );
                    }

                    // Execute all promises concurrently
                    Promise.all(verificationPromises)
                        .then(() => console.log("All verifications completed"))
                        .catch(error => console.error("Some verifications failed:", error.message));


                    //final api call
                    try {
                        let id = payment._id;
                        const final_response = await axios.post(
                            `${apiurl}/api/verify/cloneAndMoveRecordById`,
                            {
                                id,
                            },
                            { headers: { Authorization: `Bearer ${token}`, }, }
                        );
                        console.log("Final response: ", final_response.data);
                    }
                    catch (error) {
                        console.error("Error while verifying documents:", error);
                    }

                    // verificationPromises = [];
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
