import express from 'express';
import studentRoute from './routes/students.js';
import { notFoundHanler } from './middlewars/notFoundHandler.js';
import { errorHandler } from './middlewars/errorHandler.js';
const app = express();

app.use('/students', studentRoute);
// app.use(express.json());

app.use(notFoundHanler);

app.use(errorHandler);

export default app;
