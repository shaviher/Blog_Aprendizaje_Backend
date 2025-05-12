import { Router } from 'express';
import { addComment, deleteComment, updateComment } from './comment.controller.js';
import { createCommentsValidator } from "../middlewares/comments-validator.js";

const router = Router();

/**
 * @swagger
 * /addComment/{pid}:
 *   post:
 *     summary: Agregar un comentario a un producto
 *     tags: [Comentarios]
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: ID del producto al que se le añadirá el comentario
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: El texto del comentario
 *     responses:
 *       200:
 *         description: Comentario agregado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post("/addComment/:pid", createCommentsValidator, addComment);

/**
 * @swagger
 * /deleteComment/{cid}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del comentario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/deleteComment/:cid", deleteComment);

/**
 * @swagger
 * /updateComment/{cid}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del comentario a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: El texto actualizado del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/updateComment/:cid", updateComment);

export default router;
