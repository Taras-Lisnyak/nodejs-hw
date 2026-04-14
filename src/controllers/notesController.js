import { Note } from '../models/note.js';
import createHttpError from 'http-errors';


// POST /notes — створює нотатку
export const createNote = async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

// GET /notes/:noteId — повертає нотатку за ID
export const getNoteById = async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found' );
    }

    res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { returnDocument: "after" }, // повертаємо оновлений документ
  );

  if (!note) {
	throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, search, tag, sortBy = "_id", sortOrder = "asc", } = req.query;
  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  // Будуємо фільтр
    if (search) {
      notesQuery.where({ $text: { $search: search } });
  }
  if (tag) {
    notesQuery.where("tag").equals(tag);
  }


  const [totalItems, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
    notesQuery.sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    notes,
  });
};
