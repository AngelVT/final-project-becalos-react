import app from "./app.js";
import { IM_API_PORT } from "./config/environment.config.js";

const { PORT } = process.env;

const server = app.listen(IM_API_PORT || PORT, () => {
    console.log("Listening on port: ", IM_API_PORT || PORT);
});