import ItemModel from "../models/item.js";

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
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
