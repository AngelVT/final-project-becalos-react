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

export async function findAll() {
    const points = await Point.findAll({
        include: [
            {
                model: Rating,
                as: "ratings",
                attributes: ["value"],
            },
        ],
    });

    return points.map((p) => {
        const ratings = p.ratings || [];
        const total_ratings = ratings.length;
        const average_score = total_ratings
            ? parseFloat((ratings.reduce((sum, r) => sum + r.value, 0) / total_ratings).toFixed(2))
            : null;

        return {
            point_id: p.point_id,
            name: p.name,
            description: p.description,
            location: p.location,
            average_score,
            total_ratings,
        };
    });
}

export async function findAndRatePoint(pointId, score, userId) {
    const point = await Point.findByPk(pointId);
    if (!point) {
        throw new ValidationError("Point not found.");
    }

    let rating = await Rating.findOne({
        where: { user_id: userId, point_id: pointId },
    });

    if (rating) {
        rating.value = score;
        await rating.save();
    } else {
        rating = await Rating.create({
            user_id: userId,
            point_id: pointId,
            value: score,
        });
    }

    const ratings = await Rating.findAll({ where: { point_id: pointId } });
    const average = ratings.reduce((acc, r) => acc + r.value, 0) / ratings.length;

    return {
        point_id: pointId,
        user_score: rating.value,
        average_score: parseFloat(average.toFixed(2)),
        total_ratings: ratings.length,
    };
}