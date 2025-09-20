import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { IM_SECRET_COOKIE } from './config/environment.config.js';

const app = express();

app.use(cookieParser(IM_SECRET_COOKIE));
app.use(cors());

app.get('/ping', (req, res) => {
    res.status(200).json({ msg: "pong" });
});

app.use((req, res) => {
    res.status(404).json({
        msg: "Resource not found"
    });
});

export default app;