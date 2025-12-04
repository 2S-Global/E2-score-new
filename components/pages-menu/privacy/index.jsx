import IntroDescriptions from "./IntroDescriptions";

const index = () => {
  return (
    <>
      <section className="about-section-three">
        <div className="auto-container">
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
              Privacy Policy for GEISIL
            </p>

            <p>
              Global Employability Information Services India Limited ("We,"
              "Us," or "Our") is committed to protecting the privacy of
              individuals ("You" or "User") who use our GEISIL platform
              ("Platform") for KYC verification. This Privacy Policy outlines
              how we collect, use, disclose, and safeguard your personal
              information. By using GEISIL, you consent to the practices
              described in this policy.
            </p>

            <ol style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}>
              <li>
                <strong className="text-primary">
                  1. Information We Collect
                </strong>
              </li>
            </ol>

            <p>We collect the following types of information:</p>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <strong>Information for KYC Verification:</strong>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    Identity information (e.g., name, address, date of birth,
                    government-issued ID details).
                  </li>
                  <li>
                    Contact information (e.g., email address, phone number).
                  </li>
                  <li>Documents and images provided for verification.</li>
                  <li>Any other information necessary for KYC compliance.</li>
                </ul>
              </li>
              <li>
                <strong>Payment Information:</strong>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    For processing payments, we use Razorpay, a third-party
                    payment gateway. We do not directly collect or store your
                    complete payment details (e.g., credit card number, CVV).
                    Razorpay's privacy policy will govern the collection, use,
                    and storage of your payment information. We will receive
                    transaction details from Razorpay, such as transaction ID,
                    amount paid, and payment status.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Usage Data:</strong>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    Information about your use of the Platform, including login
                    activity, verification attempts, and other interactions.
                  </li>
                  <li>
                    Technical data, such as IP address, browser type, device
                    information, and operating system.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Communications:</strong>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>
                    Records of any correspondence between you and us (e.g.,
                    support requests, emails).
                  </li>
                </ul>
              </li>
            </ul>

            <ol
              start="2"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">
                  2. How We Use Your Information
                </strong>
              </li>
            </ol>

            <p>We use your information for the following purposes:</p>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <strong>KYC Verification:</strong> To perform KYC verification
                in accordance with applicable laws and regulations. This
                includes verifying the authenticity of your documents and
                confirming your identity.
              </li>
              <li>
                <strong>Platform Functionality:</strong> To provide and maintain
                the QuikChek Platform, including user authentication, account
                management, and customer support.
              </li>
              <li>
                <strong>Payment Processing:</strong> To facilitate payment for
                our services through Razorpay.
              </li>
              <li>
                <strong>Improvement of Services:</strong> To analyze usage data
                and feedback to improve the Platform's functionality, security,
                and user experience.
              </li>
              <li>
                <strong>Communication:</strong> To communicate with you
                regarding your account, verification status, updates to our
                services, and important notices.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with applicable
                laws, regulations, and legal processes.
              </li>
              <li>
                <strong>Security:</strong> To protect the security and integrity
                of the Platform and prevent fraud.
              </li>
            </ul>

            <ol
              start="3"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">
                  3. Information Sharing and Disclosure
                </strong>
              </li>
            </ol>

            <p>We may share your information with the following:</p>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party service providers who assist us in
                providing and maintaining the Platform, such as data storage
                providers, and IT support.
              </li>
              <li>
                <strong>Razorpay:</strong> We will share necessary transaction
                details with Razorpay to process your payments.
              </li>
              <li>
                <strong>Regulatory Bodies:</strong> We may disclose your
                information to regulatory bodies and government authorities as
                required by law.
              </li>
              <li>
                <strong>Legal Purposes:</strong> We may disclose your
                information in response to a subpoena, court order, or other
                legal process, or to protect our rights and interests.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of all or a portion of our assets, your
                information may be transferred to the acquiring entity.
              </li>
            </ul>

            <ol
              start="4"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">4. Data Retention</strong>
              </li>
            </ol>

            <p>
              We will retain your personal information only for as long as
              necessary to fulfill the purposes outlined in this Privacy Policy,
              including legal and regulatory requirements. KYC data will be
              retained as per regulatory guidelines.
            </p>

            <ol
              start="5"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">5. Security</strong>
              </li>
            </ol>

            <p>
              We implement reasonable security measures to protect your
              information from unauthorized access, use, or disclosure. These
              measures include:
            </p>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Encryption of data in transit and at rest.</li>
              <li>Secure server infrastructure.</li>
              <li>Access controls and authentication procedures.</li>
              <li>Regular security audits and assessments.</li>
            </ul>

            <ol
              start="6"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">6. Your Rights</strong>
              </li>
            </ol>

            <p>
              You may have the following rights regarding your personal
              information, subject to applicable laws:
            </p>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <strong>Access:</strong> You may have the right to request
                access to the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You may have the right to request
                that we correct any inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> You may have the right to request
                that we delete your personal information.
              </li>
              <li>
                <strong>Objection:</strong> You may have the right to object to
                the processing of your personal information in certain
                circumstances.
              </li>
              <li>
                <strong>Restriction of Processing:</strong> You may have the
                right to restrict the processing of your personal information in
                certain circumstances.
              </li>
            </ul>

            <p>
              To exercise your rights, please contact us at the contact
              information provided below. We will respond to your request in
              accordance with applicable laws.
            </p>

            <ol
              start="7"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">7. Third-Party Links</strong>
              </li>
            </ol>

            <p>
              The Platform may contain links to third-party websites or
              services. We are not responsible for the privacy practices of
              those third parties. We encourage you to review the privacy
              policies of any third-party websites or services you visit.
            </p>

            <ol
              start="8"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">
                  8. Changes to this Privacy Policy
                </strong>
              </li>
            </ol>

            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the updated policy
              on our Platform and updating the "Last Updated" date. Your
              continued use of the Platform after the changes constitutes your
              acceptance of the updated Privacy Policy.
            </p>

            <ol
              start="9"
              style={{ paddingLeft: "1.5rem", marginTop: "1.5rem" }}
            >
              <li>
                <strong className="text-primary">9. Contact Us</strong>
              </li>
            </ol>

            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>

            <p>
              <strong>
                Global Employability Information Services India Limited
              </strong>
            </p>
            <p>Kolkata, INDIA</p>
            <p>
              <a href="mailto:info@geisil.com" style={{ color: "#0066cc" }}>
                info@geisil.com
              </a>
            </p>

            <p>&nbsp;</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
