const FormContentcom = () => {
    return (
      <form method="post" action="add-parcel.html">
        
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="name" placeholder="Name as per PAN" required />
        </div>
        {/* name */}
        <div className="form-group">
          <label>Official Email Address</label>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        {/* Email */}

        <div className="form-group">
  <label>Number of Employees</label>
  <select name="employees" required>
    <option value="">Select</option>
    <option value="less_than_50">Less than 50</option>
    <option value="50_100">50 - 100</option>
    <option value="101_500">101 - 500</option>
    <option value="501_1000">501 - 1000</option>
    <option value="more_than_1000">More than 1000</option>
  </select>
</div>
        {/* Number of Employees */}

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" placeholder="Phone Number" required />
        </div>
        {/* Phone */}

        <div className="form-group">
          <label>Pincode</label>
          <input type="text" name="pincode" placeholder="Pincode" required />
        </div>
         {/* Pincode */}
         
        <div className="form-group">
  <label>Address</label>
  <textarea name="address" placeholder="Enter your address" required></textarea>
</div>
        {/* Address */}
        <div className="form-group">
          <label>Password</label>
          <input
            id="password-field"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {/* password */}
  
        <div className="form-group">
          <button className="theme-btn btn-style-one" type="submit">
            Register
          </button>
        </div>
        {/* login */}
      </form>
    );
  };
  
  export default FormContentcom;
  