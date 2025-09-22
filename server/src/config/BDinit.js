import { initSchemas, initExtensions } from "./database.config.js";
import { syncModels, setDefaultUser, initAssociations } from "./models.config.js";

export async function initDB() {
    await initExtensions();
    await initSchemas();
    await initAssociations();
    await syncModels();
    await setDefaultUser();
}