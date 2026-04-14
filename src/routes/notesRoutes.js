import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import { createNoteSchema } from '../validations/notesValidation.js';
import { noteIdParamSchema } from '../validations/notesValidation.js';
import { updateNoteSchema } from '../validations/notesValidation.js';
import { getNotesSchema } from '../validations/notesValidation.js';

const router = Router();
// Маршрути
router.get('/notes', celebrate(getNotesSchema), getAllNotes);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);
router.delete('/notes/:noteId', celebrate(noteIdParamSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);


export default router;
