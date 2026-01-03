import express from 'express';
import studentRoute from './routes/students.js';
import authRoutes from './routes/auth.js';
import { notFoundHanler } from './middlewars/notFoundHandler.js';
import { errorHandler } from './middlewars/errorHandler.js';
const app = express();

app.use(express.json()); // парсить наше body, яке приходить з фронтенда

app.use('/auth', authRoutes);

app.use('/students', studentRoute);

app.use(notFoundHanler);

app.use(errorHandler);

export default app;
