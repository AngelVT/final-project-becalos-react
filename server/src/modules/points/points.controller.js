import * as pointService from './points.service.js';
import { requestHandler } from '../../utils/request.utils.js';

export const createPoint = requestHandler(
    async function (req, res) {
        const { name, description, location } = req.body;

        const response = await pointService.requestPointCreation(name, description, location);

        res.status(200).json(response);
    }
);