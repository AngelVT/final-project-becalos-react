import ValidationError from "../errors/ValidationError.js";
import ResourceError from "../errors/ResourceError.js";
import DatabaseError from "../errors/DatabaseError.js";
import AuthenticationError from "../errors/AuthenticationError.js";

export function requestHandler(requestFn) {
    return async (req, res) => {
        try {
            await requestFn(req, res);
        } catch (error) {
            console.error(error);

            if (error instanceof ValidationError || error instanceof ResourceError) {
                return res.status(error.statusCode).json({ msg: error.message });
            }

            if (error instanceof AuthenticationError) {
                return res.status(error.statusCode).json({ msg: error.message });
            }

            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ msg: error.message });
            }

            return res.status(500).json({ msg: "Unknown server error" });
        }
    }
}