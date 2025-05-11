import { Router } from 'express';
import { addComment } from './comment.controller.js';
import { createCommentsValidator } from "../middlewares/comments-validator.js";


const router = Router();

router.post("/addComment/:pid", createCommentsValidator, addComment);


export default router;