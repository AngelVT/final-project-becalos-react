import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { IM_SECRET_COOKIE, IM_CLIENT_URL } from './config/environment.config.js';
import authRoutes from './modules/auth/auth.routes.js';
import { initSchemas, syncModels, setDefaultUser } from './config/database.config.js';

const app = express();

initSchemas();
syncModels();
setDefaultUser();

app.use(cookieParser(IM_SECRET_COOKIE));
app.use(cors({
    origin: IM_CLIENT_URL,
    credentials: true
}));
app.use(express.json({ limit: '5mb' }));

app.use('/auth', authRoutes);

app.get('/ping', (req, res) => {
    res.status(200).json({ msg: "pong" });
});

app.use((req, res) => {
    res.status(404).json({
        msg: "Resource not found"
    });
});

export default app;