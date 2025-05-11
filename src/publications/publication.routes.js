import { Router } from "express";
import { createPublicationValidator } from "../middlewares/publication-validator.js";
import { createPublication, deletePublication, listPublications, getPublicationById } from "./publication.controller.js";

const router = Router();

router.post("/createPublication", createPublicationValidator, createPublication);

router.delete("/deletePublication/:id",  deletePublication);

router.post("/listPublications",  listPublications);

router.get("/getPublicationById/:id",  getPublicationById);

export default router;
