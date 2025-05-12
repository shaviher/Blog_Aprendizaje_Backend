import { Router } from "express";
import { createPublicationValidator } from "../middlewares/publication-validator.js";
import { createPublication, deletePublication, listPublications, getPublicationById } from "./publication.controller.js";

const router = Router();

/**
 * @swagger
 * /createPublication:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *               content:
 *                 type: string
 *                 description: Contenido de la publicación
 *     responses:
 *       201:
 *         description: Publicación creada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post("/createPublication", createPublicationValidator, createPublication);

/**
 * @swagger
 * /deletePublication/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la publicación a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/deletePublication/:id", deletePublication);

/**
 * @swagger
 * /listPublications:
 *   post:
 *     summary: Listar publicaciones
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida con éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post("/listPublications", listPublications);

/**
 * @swagger
 * /getPublicationById/{id}:
 *   get:
 *     summary: Obtener una publicación por su ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la publicación a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación obtenida con éxito
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getPublicationById/:id", getPublicationById);

export default router;
