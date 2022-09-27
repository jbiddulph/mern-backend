import ItemModel from "../models/item.js";
import mongoose from "mongoose";

export const createItem = async (req, res) => {
  const item = req.body;
  console.log("userID: " + req.userId);
  const newItem = new ItemModel({
    ...item,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getItems = async (req, res) => {
  const { page } = req.query;
  try {
    // const items = await ItemModel.find();
    // res.status(200).json(items);
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await ItemModel.countDocuments({});
    const items = await ItemModel.find().limit(limit).skip(startIndex);
    res.json({
      data: items,
      currentPage: Number(page),
      totalItems: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemModel.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getItemsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid user" });
  }
  const userItems = await ItemModel.find({ creator: id });
  res.status(200).json(userItems);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No item exists with the id: ${id}` });
    }
    await ItemModel.findByIdAndRemove(id);
    res.json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No item exists with the id: ${id}` });
    }
    const updatedItem = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await ItemModel.findByIdAndUpdate(id, updatedItem, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getItemsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const items = await ItemModel.find({ title });
    res.json(items);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getItemsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const items = await ItemModel.find({ tags: { $in: tag } });
    res.json(items);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getRelatedItems = async (req, res) => {
  const tags = req.body;
  try {
    const items = await ItemModel.find({ tags: { $in: tags } });
    res.json(items);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const likeItem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No item exists with the id: ${id}` });
    }

    const item = await ItemModel.findById(id);

    const index = item.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      item.likes.push(req.userId);
    } else {
      item.likes = item.likes.filter((id) => id !== String(req.userId));
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(id, item, {
      new: true,
    });

    res.status(200).json(updateItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
