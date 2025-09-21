import Point from "./models/point.model.js";
import Rating from "./models/rating.model.js";


export async function createPoint(name, description, location) {
    return await Point.create({
        name,
        description,
        location: {
            type: "Point",
            coordinates: location
        }
    })
}