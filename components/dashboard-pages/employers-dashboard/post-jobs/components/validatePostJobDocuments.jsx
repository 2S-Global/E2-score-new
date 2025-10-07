// utils/validateDocuments.js

export const validateDocuments = (formData) => {
    const {
        jobType,
        jobLocationType,
        salary,
        advertiseCity,
        advertiseCityName,
        country,
        city,
        branch,
        address,
        // panname,
        // aadhaarnumber,
        // aadhaarname,
        // licensenumber,
        // licensename,
        // passportnumber,
        // passportname,
        // voternumber,
        // votername,
    } = formData;

    console.log("I am inside Validate Documents Functions !")
    console.log("Value of jobLocationType: ", jobLocationType);
    console.log("Type of jobLocationType:", typeof jobLocationType);


    // 🔹 Validate Job Type

    if (!Array.isArray(jobType) || jobType.length === 0) {
        return "Please select at least one Job Type.";
    }

    // if (!jobLocationType || jobLocationType.trim() === "") {
    //     return "Please select a Job Location Type.";
    // }

    // ✅ Salary validation (if needed)
    if (!salary || !salary.structure || !salary.currency || !salary.rate) {
        return "Please fill out all required salary details.";
    }

    const { structure, currency, min, max, amount, rate } = salary;

    switch (structure) {
        case "range":
            if (!currency || min == null || max == null || !rate) {
                return "For salary range, currency, min, max, and rate are required.";
            }
            break;

        case "starting amount":
        case "maximum amount":
        case "exact amount":
            if (!currency || amount == null || !rate) {
                return `For salary '${structure}', currency, amount, and rate are required.`;
            }
            break;

        default:
            return "Invalid salary structure.";
    }

    // 🔹 Validate Job Location Type
    if (!jobLocationType || jobLocationType.trim() === "") {
        return "Please select a Job Location Type.";
    }

    // 🔹 Handle Remote Job Location Logic
    if (jobLocationType === "remote") {
        if (!advertiseCity) {
            return "Please select whether you want to advertise your job in a specific city.";
        }

        if (advertiseCity === "Yes" && (!advertiseCityName || advertiseCityName.trim() === "")) {
            return "Please enter the city where you want to advertise this job.";
        }
    }

    // 🔹 Handle On-site Job Location Logic
    if (jobLocationType === "on-site") {
        if (!country || country.trim() === "") return "Please select a country.";
        if (!city || city.trim() === "") return "Please select a city.";
        if (!branch || branch.trim() === "") return "Please select a branch.";
        if (!address || address.trim() === "") return "Please enter a complete address.";
    }

    




    return null; // No validation errors
};
