import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { IM_SECRET_COOKIE, IM_CLIENT_URL } from './config/environment.config.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import pointRoutes from './modules/points/points.routes.js';
import { pong, notFound } from './utils/request.utils.js';
import { initDB } from './config/BDinit.js';

const app = express();

initDB();

app.use(cookieParser(IM_SECRET_COOKIE));

app.use(cors({
    origin: IM_CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: '5mb' }));

app.get('/ping', pong);

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/points', pointRoutes);

app.use(notFound);

export default app;