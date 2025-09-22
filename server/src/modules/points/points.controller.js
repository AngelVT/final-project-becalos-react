import * as pointService from './points.service.js';
import { requestHandler } from '../../utils/request.utils.js';

export const createPoint = requestHandler(
    async function (req, res) {
        const { name, description, location } = req.body;

        const response = await pointService.requestPointCreation(name, description, location);

        res.status(200).json(response);
    }
);

export const ratePoint = requestHandler(
    async function (req, res) {
        const { pointID } = req.params;
        const { score } = req.body;
        const userId = req.user.userID;

        const response = await pointService.requestPointRate(pointID, score, userId);

        res.status(200).json(response);
    }
);

export const getAllPoints = requestHandler(
    async function (req, res) {
        const response = await pointService.requestAllPoints();

        res.status(200).json(response);
    }
);