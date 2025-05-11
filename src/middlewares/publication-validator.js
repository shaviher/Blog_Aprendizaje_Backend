import { body } from 'express-validator';    
import { validarCampos } from "./validar-campos.js";

export const createPublicationValidator = [ 
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('course').notEmpty().withMessage('Course is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('course').isIn(['WORKSHOP', 'TECHNOLOGY', 'SUPERVISED PRACTICE']).withMessage('Invalid course'),
    validarCampos
]