import * as pointRepo from './points.repository.js';
import ValidationError from '../../errors/ValidationError.js';
import { isValidName } from '../../validation/user.validation.js';
import { isValidDescription, isValidCoordinates } from '../../validation/point.validation.js';

export async function requestPointCreation(name, description, location) {
    if (!name || !description || !location) {
        throw new ValidationError("There is missing information please make sure that you are providing a name, description and location.");
    }

    if (!isValidName(name)) {
        throw new ValidationError("There is missing information please make sure that you are providing a name, description and location.");
    }

    if (!isValidDescription(description)) {
        throw new ValidationError("The description must be at least 2 characters long and maximum 250.");
    }

    if (!isValidCoordinates(location)) {
        throw new ValidationError("The location provided is not valid, please verify the format.");
    }

    const newPoint = await pointRepo.createPoint(name, description, location);

    return {
        point: newPoint
    }
}

export async function requestAllPoints() {
    const points = await pointRepo.findAll();

    const features = points.map((p) => ({
        type: "Feature",
        geometry: p.location,
        properties: {
            point_id: p.point_id,
            name: p.name,
            description: p.description,
            average_score: p.average_score,
            total_ratings: p.total_ratings,
        },
    }));

    return {
        geojson: {
            type: "FeatureCollection",
            features,
        },
    };
}

export async function requestPointRate(pointId, score, userId) {
    if (isNaN(parseInt(score))) {
        throw new ValidationError("The score provided is invalid.");
    }

    const intScore = parseInt(score);

    if (intScore > 10 || intScore < 0) {
        throw new ValidationError("The score provided is invalid, valid scores go from 0 to 10.");
    }

    const ratedPoint = await pointRepo.findAndRatePoint(pointId, intScore, userId);

    return {
        point: ratedPoint
    };
}