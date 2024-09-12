"use strict";
import { Router } from "express";
import { generatePDFController } from "../controllers/pdf.controller.js";

const router = Router();

router.get("/", generatePDFController);

export default router;