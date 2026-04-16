import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Title should be a string",
      "string.min": "Title should have at least 1 character",
      "any.required": "Title is required",
    }),
    content: Joi.string().allow('').messages({
      "string.base": "Content should be a string",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "any.only": `Tag must be one of the following: ${TAGS.join(', ')}`,
      "string.valid": "Tag is not valid",
    }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      "string.base": "Title should be a string",
      "string.min": "Title should have at least 1 character",
    }),
    content: Joi.string().allow('').messages({
      "string.base": "Content should be a string",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "any.only": `Tag must be one of the following: ${TAGS.join(', ')}`,
      "string.valid": "Tag is not valid",
    }),
  }).or('title', 'content', 'tag'),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().trim().allow(''),
  }),
};
