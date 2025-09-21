export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export function isValidName(name) {
    const regex = /^[a-zA-ZÀ-ÿ' -]{2,50}$/u;
    return regex.test(name.trim());
}

// At least: 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
export function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
    return regex.test(password);
}