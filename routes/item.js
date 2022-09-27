import express from "express";
const router = express.Router();

import {
  createItem,
  getItems,
  getItem,
  getItemsByUser,
  deleteItem,
  updateItem,
  likeItem,
  getItemsBySearch,
  getItemsByTag,
  getRelatedItems,
} from "../controllers/item.js";
import auth from "../middleware/auth.js";

router.get("/search", getItemsBySearch);
router.get("/tag/:tag", getItemsByTag);
router.post("/relatedItems", getRelatedItems);
router.get("/", getItems);
router.get("/:id", getItem);

router.post("/", auth, createItem);
router.delete("/:id", auth, deleteItem);
router.patch("/:id", auth, updateItem);
router.get("/userItems/:id", auth, getItemsByUser);
router.patch("/like/:id", auth, likeItem);

export default router;
