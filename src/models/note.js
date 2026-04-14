import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, default: '', required: false },
    tag: {
      type: String,
      trim: true,
      default: 'Todo',
      enum: TAGS,
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
