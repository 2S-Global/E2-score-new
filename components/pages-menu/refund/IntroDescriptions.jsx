const IntroDescriptions = () => {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#000",
        }}
      >
        Refund Policy for GEISIL
      </p>

      <p>
        Global Employability Information Services India Limited ("We," "Us," or
        "Our") offers GEISIL, a platform for fast and accurate KYC verification.
        This Refund Policy outlines the terms and conditions under which refunds
        may be issued for payments made through the Razorpay payment gateway for
        our services.
      </p>

      <ol style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">1. Service Description</strong>
        </li>
      </ol>
      <p>
        GEISIL provides online KYC verification services. Upon successful
        payment through Razorpay, clients receive the verification status
        electronically through our Platform. There is no physical delivery of
        goods or services.
      </p>

      <ol start="2" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">2. Payment and Processing</strong>
        </li>
      </ol>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>
          Payments for GEISIL services are processed through our third-party
          payment gateway, Razorpay.
        </li>
        <li>
          You agree to pay the fees as specified on the Platform at the time of
          purchase.
        </li>
        <li>
          All transactions are subject to the terms and conditions of Razorpay,
          including their policies on payment processing and security.
        </li>
        <li>
          Once a payment is successfully processed, the KYC verification process
          will commence.
        </li>
      </ul>

      <ol start="3" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">3. Refund Conditions</strong>
        </li>
      </ol>
      <p>
        Due to the nature of our services (online delivery of verification
        status), refunds are generally not offered. However, refunds may be
        considered under the following exceptional circumstances, at the sole
        discretion of Us:
      </p>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>
          <strong>Service Unavailability:</strong> If the GEISIL Platform is
          completely unavailable for an extended period and we are unable to
          provide the verification service.
        </li>
        <li>
          <strong>Processing Error:</strong> If there is a technical error on
          our end that prevents the verification process from being completed,
          clearly attributable to our systems.
        </li>
        <li>
          <strong>Payment Failure at Our End:</strong> If you are charged but we
          do not receive the payment confirmation from Razorpay, and the service
          is not delivered. You must provide proof of successful transaction
          from your bank statement.
        </li>
        <li>
          <strong>Duplication of Transaction:</strong> If the customer's account
          is debited more than once for a single transaction.
        </li>
      </ul>

      <ol start="4" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">4. Non-Refundable Situations</strong>
        </li>
      </ol>
      <p>
        Refunds will <strong>NOT</strong> be issued in the following situations:
      </p>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>
          <strong>Incorrect Information:</strong> If the KYC verification fails
          due to inaccurate or incomplete information provided by you.
        </li>
        <li>
          <strong>Non-Compliance:</strong> If the verification fails because the
          provided documents do not meet required KYC standards or regulations.
        </li>
        <li>
          <strong>Change of Mind:</strong> If you change your mind after payment
          and the verification process has started.
        </li>
        <li>
          <strong>Customer's Technical Issues:</strong> Including internet
          issues or device malfunctions.
        </li>
        <li>
          <strong>Force Majeure:</strong> Events outside our control like
          natural disasters, government actions, etc.
        </li>
        <li>
          <strong>Verification Completed:</strong> If the verification status
          has already been provided.
        </li>
      </ul>

      <ol start="5" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">5. Refund Process</strong>
        </li>
      </ol>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>
          Submit a written request to info@geisil.com within 7 days of the
          transaction date.
        </li>
        <li>
          Include your name, contact details, transaction ID, transaction date,
          reason for refund, and supporting documents.
        </li>
        <li>We may require additional information for verification.</li>
        <li>
          If approved, refunds will be processed through Razorpay within
          [Number] business days to the original payment method.
        </li>
        <li>
          We reserve the right to reject requests that do not comply with this
          policy.
        </li>
      </ul>

      <ol start="6" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">6. Cancellation Policy</strong>
        </li>
      </ol>
      <p>
        Once a payment is made and the KYC process initiated, cancellation is
        not allowed.
      </p>

      <ol start="7" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">
            7. Changes to this Refund Policy
          </strong>
        </li>
      </ol>
      <p>
        We may update this Refund Policy from time to time. Material changes
        will be posted on our Platform, and the "Last Updated" date will be
        changed. Continued use of the Platform constitutes acceptance of the new
        policy.
      </p>

      <ol start="8" style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
        <li>
          <strong className="text-primary">8. Contact Us</strong>
        </li>
      </ol>
      <p>If you have any questions about this Refund Policy, contact us at:</p>

      <p>
        <strong>Global Employability Information Services India Limited</strong>
      </p>
      <p>Kolkata, INDIA</p>
      <p>
        <a href="mailto:info@geisil.com" style={{ color: "#0066cc" }}>
          info@geisil.com
        </a>
      </p>
    </div>
  );
};

export default IntroDescriptions;
