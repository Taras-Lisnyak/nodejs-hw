import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import {getAllNotes, getNoteById} from './notes.js';
import notFoundHandler  from './middlewares/notFound.js';
import errorHandler   from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// Маршрути
// GET /notes — повертає всі нотатки
app.get('/notes', async (req, res, next) => {
  try {
    const notes = await getAllNotes();
    res.json({ message: notes });
  } catch (error) {
    next(error);
  }
});

// GET /notes/:noteId — повертає нотатку за ID
app.get('/notes/:noteId', async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: note });
  } catch (error) {
    next(error);
  }
});



app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Middleware 404
app.use(notFoundHandler);

// Middleware 500
app.use(errorHandler);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
