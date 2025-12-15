import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
const CopyrightFooter = () => {
  return (
    <footer>
      <div className="copyright-text">
        <p>© {new Date().getFullYear()} E²-Score . All Right Reserved.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
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
      </div>
    </footer>
  );
};

export default CopyrightFooter;
