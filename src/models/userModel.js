import { model, Schema } from "mongoose";

const favoriteSchema = new Schema(
  {
    gameId: {
      type: Number,
      required: true,
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
    favorites: [favoriteSchema],
  },
  {
    timestamps: true,
  },
);

const User = model("user", userSchema);
export default User;
