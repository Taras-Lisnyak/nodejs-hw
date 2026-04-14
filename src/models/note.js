import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, default: '', required: false },
    tag: {
      type: String,
      trim: true,
      default: 'Todo',
      enum: ['Todo', 'Important', 'Personal', 'Work', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health'],
    },
  },
  { timestamps: true }
);

noteSchema.index({ title: 'text', content: 'text' },
{ name: 'NoteTextIndex', // Назва індексу
  default_language: "english",
}
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
export { Note };
