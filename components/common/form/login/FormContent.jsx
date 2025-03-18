"use client";  // ⬅ Required for Next.js Client Component

import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useRouter } from "next/navigation";

const FormContent = () => {
  const router = useRouter();

  const handleLogin = (path) => {
    // Close the modal manually
    const modal = document.getElementById("loginPopupModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }

    // Remove the modal backdrop if it exists
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });

    // Enable scrolling if Bootstrap disabled it
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";

    // Navigate after closing modal
    router.push(path);
  };

  return (
    <div className="form-inner">
      <h3>Login to E²-Score</h3>

      <form method="post">
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" required />
        </div>

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">Forgot password?</a>
          </div>
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="button"
            onClick={() => handleLogin("/candidates-dashboard/dashboard")}
          >
            Log In (as Candidate)
          </button>

          <button
            className="theme-btn btn-style-one"
            type="button"
            onClick={() => handleLogin("/employers-dashboard/dashboard")}
          >
            Log In (as Employer)
          </button>
        </div>
      </form>

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link href="#" className="call-modal signup" data-bs-toggle="modal" data-bs-target="#registerModal">
            Signup
          </Link>
        </div>

        <div className="divider"><span>or</span></div>

        <LoginWithSocial />
      </div>
    </div>
  );
};

export default FormContent;
