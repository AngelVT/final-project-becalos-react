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