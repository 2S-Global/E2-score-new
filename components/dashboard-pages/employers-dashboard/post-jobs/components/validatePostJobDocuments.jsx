// utils/validateDocuments.js

export const validateDocuments = (formData) => {
    const {
        jobTitle,
        jobDescription,
        getApplicationUpdateEmail,
        positionAvailable,
        jobType,
        jobExpiryDate,
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

    // Validate Job Title
    // 🔹 Validate Job Location Type
    if (!jobTitle || jobTitle.trim() === "") {
        // return "Please select a Job Location Type.";
        return { field: "jobTitle", message: "Please enter Job Title." };
    }

    if (!jobDescription || jobDescription.trim() === "") {
        // return "Please select a Job Location Type.";
        return { field: "jobDescription", message: "Please enter Job Description." };
    }

    if (!getApplicationUpdateEmail || getApplicationUpdateEmail.trim() === "") {
        // return "Please select a Job Location Type.";
        return { field: "getApplicationUpdateEmail", message: "Please enter email." };
    }

    if (!positionAvailable || positionAvailable.trim() === "") {
        // return "Please select a Job Location Type.";
        return { field: "positionAvailable", message: "Please enter Number of Positions Available." };
    }


    // 🔹 Validate Job Type

    if (!Array.isArray(jobType) || jobType.length === 0) {
        // return "Please select at least one Job Type.";
        return { field: "jobType", message: "Please select at least one Job Type." };
    }

    // Validate Job Expiry Date
    if (!jobExpiryDate || isNaN(new Date(jobExpiryDate).getTime())) {
        return { field: "jobExpiryDate", message: "Please enter a valid Job Expiry Date." };
    }

    // if (!jobLocationType || jobLocationType.trim() === "") {
    //     return "Please select a Job Location Type.";
    // }

    // ✅ Salary validation (if needed)
    if (!salary || !salary.structure || !salary.currency || !salary.rate) {
        // return "Please fill out all required salary details.";
        return { field: "salaryStructure", message: "Please fill out all required salary details." };
    }

    const { structure, currency, min, max, amount, rate } = salary;

    switch (structure) {
        case "range":
            if (!currency || min == null || max == null || !rate) {
                // return "For salary range, currency, min, max, and rate are required.";
                return {
                    field: "salaryStructure",
                    message: "For salary range, currency, min, max, and rate are required.",
                };
            }
            break;

        case "starting amount":
        case "maximum amount":
        case "exact amount":
            if (!currency || amount == null || !rate) {
                // return `For salary '${structure}', currency, amount, and rate are required.`;
                return {
                    field: "salaryStructure",
                    message: `For salary '${structure}', currency, amount, and rate are required.`,
                };
            }
            break;

        default:
            // return "Invalid salary structure.";
            return { field: "salaryStructure", message: "Invalid salary structure." };
    }

    // 🔹 Validate Job Location Type
    if (!jobLocationType || jobLocationType.trim() === "") {
        // return "Please select a Job Location Type.";
        return { field: "jobLocationType", message: "Please select a Job Location Type." };
    }

    // 🔹 Handle Remote Job Location Logic
    if (jobLocationType === "remote") {
        if (!advertiseCity) {
            // return "Please select whether you want to advertise your job in a specific city.";
            return { field: "advertiseCity", message: "Please select whether you want to advertise your job in a specific city." };
        }

        if (advertiseCity === "Yes" && (!advertiseCityName || advertiseCityName.trim() === "")) {
            return { field: "advertiseCityName", message: "Please enter the city where you want to advertise this job." };
        }
    }

    // 🔹 Handle On-site Job Location Logic
    if (jobLocationType === "on-site") {
        if (!country || country.trim() === "") return { field: "country", message: "Please select a country." };
        if (!city || city.trim() === "") return { field: "city", message: "Please select a city." };
        if (!branch || branch.trim() === "") return { field: "branch", message: "Please select a branch." };
        if (!address || address.trim() === "") return { field: "address", message: "Please enter a complete address." };
    }






    return null; // No validation errors
};
