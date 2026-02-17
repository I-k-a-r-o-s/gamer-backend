import { model, Schema } from "mongoose";

const favoriteSchema = new Schema(
  {
    gameId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    background_image: {
      type: String,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [favoriteSchema],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("user", userSchema);
export default User;
