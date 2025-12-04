"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Layout({ children }) {
  const handlecompanyclick = () => {
    handleExternalLink("https://geisil.com/");
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#EBE8E2",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-light text-center text-dark py-4 mt-5 border-top mt-auto">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
              <Link href="/" className="text-muted text-decoration-none">
                Home
              </Link>
              <Link href="/about" className="text-muted text-decoration-none">
                About Us
              </Link>
              <Link href="/pricing" className="text-muted text-decoration-none">
                Pricing
              </Link>
              <Link href="/contact" className="text-muted text-decoration-none">
                Contact Us
              </Link>
              <Link href="/privacy" className="text-muted text-decoration-none">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted text-decoration-none">
                Terms & Conditions
              </Link>
              <Link href="/refund" className="text-muted text-decoration-none">
                Cancellation/Refund Policy
              </Link>
            </div>
            <div>
              <p className="mb-1">
                © {new Date().getFullYear()}{" "}
                <strong className="text-primary">GEISIL</strong>. All Rights
                Reserved.
              </p>
              <p className="mb-3 text-muted small">
                Developed and maintained by{" "}
                <strong
                  className="text-dark"
                  /* onClick={handlecompanyclick} */
                  style={{ cursor: "pointer" }}
                >
                  Global Employability Information Services India Limited
                </strong>
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                /*     onClick={() => handleExternalLink("#")} */
                className="btn btn-outline-primary rounded-circle"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </button>
              <button
                /*  onClick={() => handleExternalLink("#")} */
                className="btn btn-outline-primary rounded-circle"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
