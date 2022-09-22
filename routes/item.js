import express from "express";
const router = express.Router();

import { createItem, getItems } from "../controllers/item.js";
import auth from "../middleware/auth.js";

router.post("/", auth, createItem);
router.get("/", getItems);

export default router;
