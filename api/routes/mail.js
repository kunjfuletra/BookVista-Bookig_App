import express from "express";
import sendMail from "../controller/sendMail.js";
const router = express.Router();
router.get("/sendmail",sendMail)

export default router