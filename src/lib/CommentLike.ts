import mongoose from "mongoose";

const CommentLikeSchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  action: { type: String, enum: ["like", "dislike"], required: true },
});

export default mongoose.models.CommentLike ||
  mongoose.model("CommentLike", CommentLikeSchema);
