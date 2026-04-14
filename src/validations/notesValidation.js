import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      "string.base": "Title should be a string",
      "string.min": "Title should have at least 3 characters",
      "string.max": "Title should have at most 30 characters",
      "any.required": "Title is required",
    }),
    content: Joi.string().min(3).max(30).messages({
      "string.base": "Content should be a string",
      "string.min": "Content should have at least 3 characters",
      "string.max": "Content should have at most 30 characters",
    }),
    tag: Joi.string().valid("Todo", "Important", "Personal", "Work", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health").messages({
      "any.only": "Tag must be one of the following: Todo, Important, Personal, Work, Meeting, Shopping, Ideas, Travel, Finance, Health",
      "string.valid": "Tag is not valid",
    }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).messages({
      "string.base": "Title should be a string",
      "string.min": "Title should have at least 3 characters",
      "string.max": "Title should have at most 30 characters",
    }),
    content: Joi.string().min(3).max(30).messages({
      "string.base": "Content should be a string",
      "string.min": "Content should have at least 3 characters",
      "string.max": "Content should have at most 30 characters",
    }),
    tag: Joi.string().valid("Todo", "Important", "Personal", "Work", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health").messages({
      "any.only": "Tag must be one of the following: Todo, Important, Personal, Work, Meeting, Shopping, Ideas, Travel, Finance, Health",
      "string.valid": "Tag is not valid",
    }),
  }).min(1),
};


export const getNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid("Todo", "Important", "Personal", "Work", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health"),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().valid("_id", "title", "content", "tag"),
    sortOrder: Joi.string().valid("asc", "desc"),
  }),
};
