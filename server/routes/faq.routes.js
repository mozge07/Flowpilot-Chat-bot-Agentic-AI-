import express from "express";

import {
  createFaqController,
  getAllFaqsController,
  getFaqByIdController,
  updateFaqController,
  deleteFaqController
} from "../controllers/faq.controller.js";

const router = express.Router();

router.post("/", createFaqController);
router.get("/", getAllFaqsController);
router.get("/:faqId", getFaqByIdController);
router.put("/:faqId", updateFaqController);
router.delete("/:faqId", deleteFaqController);

export default router;