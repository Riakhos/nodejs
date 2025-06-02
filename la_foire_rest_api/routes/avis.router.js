import express from "express";
import * as CONTROLLER from "../controllers/avis.controller.js";
import { verifieToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/add/:articleId',verifieToken, CONTROLLER.postAvis);
router.delete('/delete/:avisId', verifieToken, CONTROLLER.deleteAvis);
router.put('/update/:avisId', verifieToken, CONTROLLER.updateAvis);
router.get('/all', CONTROLLER.getAvis);
router.get('/get/:avisId', verifieToken, CONTROLLER.getAvisById);

export default router;