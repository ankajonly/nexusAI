// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
    return password && password.length >= 6;
};

// Name validation
export const validateName = (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// Validate signup input
export const validateSignup = (data) => {
    const errors = {};

    if (!validateName(data.firstName)) {
        errors.firstName = 'First name must be between 2-50 characters';
    }

    if (!validateName(data.lastName)) {
        errors.lastName = 'Last name must be between 2-50 characters';
    }

    if (!validateEmail(data.email)) {
        errors.email = 'Invalid email address';
    }

    if (!validatePassword(data.password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Validate login input
export const validateLogin = (data) => {
    const errors = {};

    if (!validateEmail(data.email)) {
        errors.email = 'Invalid email address';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
