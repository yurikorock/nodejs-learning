import express from 'express';
import path from "node:path";
import studentRoute from './routes/students.js';
import authRoutes from './routes/auth.js';
import { notFoundHanler } from './middlewars/notFoundHandler.js';
import { errorHandler } from './middlewars/errorHandler.js';
import cookieParser from 'cookie-parser';
import auth from './middlewars/auth.js';

const app = express();

app.use(express.json()); // парсить наше body, яке приходить з фронтенда
app.use(cookieParser()); // парсить наші кукі з рядочку у headers, щоб ми могли використати метод cookies,
// для логаута юзера див. logoutController

app.use("/avatars", express.static(path.resolve("src/uploads/avatars")));//це якщо хочемо завантажити статичний файл в браузері

app.use('/auth', authRoutes);

app.use('/students', auth, studentRoute);

app.use(notFoundHanler);

app.use(errorHandler);

export default app;
