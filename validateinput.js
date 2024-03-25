function validateEmail(email) {
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Regular expression to check password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return false;
}

// Check password strength
if (!validatePassword(password)) {
    alert('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character');
    return false;
}