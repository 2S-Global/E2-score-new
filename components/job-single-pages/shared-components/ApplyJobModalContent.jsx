import Link from "next/link";

const ApplyJobModalContent = () => {
  return (
    <form className="default-form job-apply-form">
      <div className="row">


         {/* Notice Period */}
        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
          <select className="form-control" name="noticePeriod" required>
            <option value="">Notice Period</option>
            <option value="immediate">Immediate</option>
            <option value="15_days">15 Days</option>
            <option value="30_days">30 Days</option>
            <option value="45_days">45 Days</option>
            <option value="60_days">60 Days</option>
          </select>
        </div>

        {/* Preferred Time */}
        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
          <select className="form-control" name="preferredTime" required>
            <option value="">Preferred Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        {/* Availability on Saturday */}
        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
          <label className="mb-2 d-block">
            Availability on Saturday
          </label>
          <div className="input-group checkboxes square">
            <input
              type="radio"
              name="saturdayAvailability"
              id="saturdayYes"
              value="yes"
              required
            />
            <label htmlFor="saturdayYes" className="remember me-4">
              <span className="custom-checkbox"></span> Yes
            </label>

            <input
              type="radio"
              name="saturdayAvailability"
              id="saturdayNo"
              value="no"
            />
            <label htmlFor="saturdayNo" className="remember">
              <span className="custom-checkbox"></span> No
            </label>
          </div>
        </div>

        {/* Preferred Time */}
        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
          <select className="form-control" name="preferredTime" required>
            <option value="">Willing to Relocate</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Message */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            required
          ></textarea>
        </div>

       

        {/* Terms & Conditions */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="rememberMe" required />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            name="submit-form"
          >
            Apply Job
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyJobModalContent;
