const config = require("../config/env");

const isUniversityEmail = (email) => {
    const normalizedEmail = email.trim().toLowerCase();

    const atIndex = normalizedEmail.lastIndexOf("@");

    if (atIndex === -1) {
        return false;
    }

    const domain = normalizedEmail.substring(atIndex + 1);

    return config.universityEmailDomains.includes(domain);
};

module.exports = {
    isUniversityEmail,
};