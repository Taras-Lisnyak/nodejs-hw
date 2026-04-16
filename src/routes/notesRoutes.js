import { Router } from "express";
import { celebrate } from "celebrate";
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import { createNoteSchema, noteIdSchema, updateNoteSchema, getAllNotesSchema } from '../validations/notesValidation.js';
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
// Маршрути

// 2. Додаємо middleware до всіх шляхів, що починаються з /notes
router.use("/notes", authenticate);

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);


export default router;
