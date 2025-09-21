import { initSchemas, initExtensions } from "./database.config.js";
import { syncModels, setDefaultUser } from "./models.config.js";

export async function initDB() {
    await initExtensions();
    await initSchemas();
    await syncModels();
    await setDefaultUser();
}