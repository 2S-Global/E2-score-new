import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("Admin_token");

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(
                    `${apiurl}/api/usercart/list_user_cart`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    setPayments(response.data.data);
                    setSubTotal(parseFloat(response.data.overall_billing.subtotal));
                    setGst(parseFloat(response.data.overall_billing.gst));
                    setTotal(parseFloat(response.data.overall_billing.total));
                } else {
                    setError("Failed to fetch data.");
                }
            } catch (err) {
                setError("Error fetching data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
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
                    <span>Sub-Total :</span> <span>{subTotal.toFixed(2)} INR</span>
                </p>
                <p className="d-flex justify-content-between mb-1">
                    <span>GST (18%) :</span> <span>{gst.toFixed(2)} INR</span>
                </p>
                <p className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total :</span> <span>{total.toFixed(2)} INR</span>
                </p>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-success btn-sm">
                    Pay Now ({total.toFixed(2)} INR)
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
