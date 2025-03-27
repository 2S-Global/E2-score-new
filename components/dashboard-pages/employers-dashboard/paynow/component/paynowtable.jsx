import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);

    // Simulating API call
    useEffect(() => {
        const samplePayments = [
            {
                id: 1,
                name: "Avik Ghosh",
                mobile: "8697744701",
                payFor: "PAN, Aadhaar, Driving Licence",
                amount: 500,
            },
            {
                id: 2,
                name: "Rohit Sharma",
                mobile: "9876543210",
                payFor: "Passport",
                amount: 500,
            },
        ];
        setPayments(samplePayments);
    }, []);

    const subTotal = 1000;
    const gst = 180; // 18% GST
    const total = 1180;

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
                            <td>{payment.mobile}</td>
                            <td>{payment.payFor}</td>
                            <td>{payment.amount} INR</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="p-3 bg-light rounded">
                <p className="d-flex justify-content-between mb-1">
                    <span>Sub-Total :</span> <span>{subTotal} INR</span>
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
