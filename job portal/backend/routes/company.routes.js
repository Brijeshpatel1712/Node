import express from "express";
import { getCompanies } from "../controllers/company.controller.js";

const router = express.Router();
router.get("/", getCompanies);
export default router;
