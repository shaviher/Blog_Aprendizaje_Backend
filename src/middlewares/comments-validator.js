import { body } from 'express-validator';
import { validarCampos } from "./validar-campos.js";

export const createCommentsValidator = [
    body("author").notEmpty().withMessage("Author is required"),
    body("content").notEmpty().withMessage("Content is required"),
    validarCampos
]

