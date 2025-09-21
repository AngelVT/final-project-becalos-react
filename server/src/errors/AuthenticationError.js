import AppError from "./AppError.js";

class AuthenticationError extends AppError {
    constructor(message) {
        super(`Authentication error: ${message}`, 403);
    }
}

export default AuthenticationError;