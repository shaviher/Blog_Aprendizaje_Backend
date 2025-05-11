import { Router } from "express";
import { createPublicationValidator } from "../middlewares/publication-validator.js";
import { createPublication, deletePublication, listPublications } from "./publication.controller.js";

const router = Router();

router.post("/createPublication", createPublicationValidator, createPublication);

router.delete("/deletePublication/:id",  deletePublication);

router.post("/listPublications",  listPublications);

// Buscar

export default router;
