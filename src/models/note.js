import mongoose from 'mongoose';

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

const Note = mongoose.model('Note', noteSchema);

export default Note;
export { Note };
