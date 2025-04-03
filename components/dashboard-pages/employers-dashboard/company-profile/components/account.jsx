const AccountBox = () => {
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            defaultValue={"Demo username"}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email for Communication</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Email"
            defaultValue={"company@abc.com"}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input type="text" name="name" defaultValue={"Recruiter"} readOnly />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Reporting Manager</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Reporting Manager Name"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Mobile Number</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12"></div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountBox;
