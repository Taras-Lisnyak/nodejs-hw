import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes); // Використовуємо маршрути для аутентифікації
app.use(notesRoutes); // Використовуємо маршрути для нотаток

// Middleware 404
app.use(notFoundHandler);

// обробка помилок від celebrate (валідація)
app.use(errors());

// Middleware 500
app.use(errorHandler);

await connectMongoDB();

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
