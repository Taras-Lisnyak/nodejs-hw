import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import { logger } from './middlewares/logger.js';
import notFoundHandler  from './middlewares/notFoundHandler.js';
import errorHandler   from './middlewares/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.use(notesRoutes); // Використовуємо маршрути для нотаток
app.use('/api', notesRoutes); // Додатковий префікс для сумісності

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});


// Middleware 404
app.use(notFoundHandler);

// Middleware 500
app.use(errorHandler);

await connectMongoDB();

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
