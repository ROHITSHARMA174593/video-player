// src/lib/Like.ts
import mongoose, { Schema, models, model } from "mongoose";

const LikeSchema = new Schema({
  email: { type: String, required: true },
  videoId: { type: String, required: true },
  liked: { type: Boolean, default: false },
  disliked: { type: Boolean, default: false },
}, { timestamps: true });

const Like = models.Like || model("Like", LikeSchema);
export default Like;
