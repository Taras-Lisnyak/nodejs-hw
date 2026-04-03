// src/notes.js
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesPath = path.join(__dirname, 'notes.json');

export async function getAllNotes() {
  try {
    const data = await readFile(notesPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(notesPath, '[]');
      return [];
    }
    throw error;
  }
}

export async function getNoteById(noteId) {
  const notes = await getAllNotes();
  return notes.find((note) => note.id === noteId) || null;
}

