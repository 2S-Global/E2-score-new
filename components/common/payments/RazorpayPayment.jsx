import React, { useEffect, useState } from "react";

const RazorpayPayment = ({ amount, razorpayKey, onSuccess, paymentIds }) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const pay = amount;
  let pids = "";
  if (paymentIds) {
    pids = paymentIds;
  } else {
    pids = "";
  }

  useEffect(() => {
    if (window.Razorpay) {
      setIsRazorpayLoaded(true);
      return;
    }

    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK is not loaded yet!");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      name: "E2 Score",
      description: "Payment for Verification",
      handler: function (response) {
        // alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        console.log(response);
        if (onSuccess) onSuccess(response, pay, pids);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={handlePayment}
      disabled={!isRazorpayLoaded}
    >
      {isRazorpayLoaded ? `Pay (${amount?.toFixed(2)} INR)` : "Loading..."}
    </button>
  );
};

export default RazorpayPayment;
