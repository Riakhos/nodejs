import express from "express";
import { verifieToken } from "../middlewares/auth.middleware.js";
import * as CONTROLLER from "../controllers/article.controller.js";

const router = express.Router();

router.post("/add", CONTROLLER.postArticle);
router.get("/all", CONTROLLER.getAllArticle);
router.get("/get/:id", CONTROLLER.oneArticle);
router.put("/update/:id", verifieToken, CONTROLLER.updateArticle);
router.delete("/delete/:id", verifieToken, CONTROLLER.deleteArticle);
router.get("/asc", CONTROLLER.ascArticle);
router.get("/desc", CONTROLLER.descArticle);
router.get("/avis/:id", verifieToken, CONTROLLER.avisByArticle);
router.get("/note", CONTROLLER.sortedByNote);
router.get("/search", CONTROLLER.search);

export default router;
