import { Router } from 'express';
import { addComment, deleteComment, updateComment } from './comment.controller.js';
import { createCommentsValidator } from "../middlewares/comments-validator.js";


const router = Router();

router.post("/addComment/:pid", createCommentsValidator, addComment);

router.delete("/deleteComment/:cid",  deleteComment);

router.put("/updateComment/:cid", updateComment)


export default router;