import { Router } from 'express';
import { addComment, deleteComment } from './comment.controller.js';
import { createCommentsValidator } from "../middlewares/comments-validator.js";


const router = Router();

router.post("/addComment/:pid", createCommentsValidator, addComment);

router.delete("/deleteComment/:cid",  deleteComment);

// elimianr 
//editar 



export default router;