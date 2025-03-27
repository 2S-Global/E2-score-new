import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CardPaymentForm from "./modal/cardform";

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState(null);

    const apiurl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem("Admin_token");
        console.log("Fetched token:", storedToken); // Debugging
        setToken(storedToken);
    }, []);

    const openModalRH = () => {
        console.log("Opening Modal..."); // Debugging
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModalRH = () => {
        console.log("Closing Modal..."); // Debugging
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        if (!token) return;

        const fetchPayments = async () => {
            try {
                console.log("Fetching payments..."); // Debugging
                const response = await axios.get(`${apiurl}/api/usercart/list_user_cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setPayments(response.data.data);
                    setSubTotal(parseFloat(response.data.overall_billing.subtotal) || 0);
                    setGst(parseFloat(response.data.overall_billing.gst) || 0);
                    setTotal(parseFloat(response.data.overall_billing.total) || 0);
                } else {
                    setError("Failed to fetch data.");
                }
            } catch (err) {
                console.error("Error fetching data:", err); // Debugging
                setError("Error fetching data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [token]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <>
            <div className="container">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Pay For</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.name}</td>
                                <td>{payment.mobile || "N/A"}</td>
                                <td>{payment.payFor || "N/A"}</td>
                                <td>{payment.amount} INR</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-3 bg-light rounded">
                    <p className="d-flex justify-content-between mb-1">
                        <span>Sub-Total :</span> <span>{subTotal?.toFixed(2)} INR</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1">
                        <span>GST (18%) :</span> <span>{gst?.toFixed(2)} INR</span>
                    </p>
                    <p className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total :</span> <span>{total?.toFixed(2)} INR</span>
                    </p>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-success btn-sm" onClick={openModalRH}>
                        Pay Now ({total?.toFixed(2)} INR)
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <CardPaymentForm
                    show={isModalOpen}
                    onClose={closeModalRH}
                    mainamount={total}
                />
            )}
        </>
    );
};

export default PaymentDetails;
