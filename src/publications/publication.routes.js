import { Router } from "express";
import { createPublicationValidator } from "../middlewares/publication-validator.js";
import { createPublication } from "./publication.controller.js";

const router = Router();

router.post("/createPublication", createPublicationValidator, createPublication);

export default router;
