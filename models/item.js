import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  status: String,
  creator: String,
  tags: [String],
  imageFile: String,
  //   location: {
  //     type: "Point",
  //     coordinates: [Number],
  //     formattedAddress: String,
  //   },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;
