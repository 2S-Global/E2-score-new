// utils/validateDocuments.js

export const validateDocuments = (formData) => {
  const {
    pannumber,
    panname,
    aadhaarnumber,
    aadhaarname,
    licensenumber,
    licensename,
    passportnumber,
    passportname,
    voternumber,
    votername,
  } = formData;

  const hasAnyDoc =
    pannumber ||
    aadhaarnumber ||
    licensenumber ||
    voternumber ||
    passportnumber;

  if (!hasAnyDoc) {
    return "At least one of PAN,  Driving License, Passport, or EPIC Number is required.";
  }

  if (!panname && pannumber)
    return "PAN Name is required when PAN Number is provided.";
  if (panname && !pannumber)
    return "PAN Number is required when PAN Name is provided.";

  if (!aadhaarname && aadhaarnumber)
    return "Aadhaar Name is required when Aadhaar Number is provided.";
  if (aadhaarname && !aadhaarnumber)
    return "Aadhaar Number is required when Aadhaar Name is provided.";

  if (!licensename && licensenumber)
    return "Driving License Name is required when Number is provided.";
  if (licensename && !licensenumber)
    return "Driving License Number is required when Name is provided.";

  if (!passportname && passportnumber)
    return "Passport Name is required when Number is provided.";
  if (passportname && !passportnumber)
    return "Passport Number is required when Name is provided.";

  if (!votername && voternumber)
    return "EPIC Name is required when Number is provided.";
  if (votername && !voternumber)
    return "EPIC Number is required when Name is provided.";

  return null; // No validation errors
};
