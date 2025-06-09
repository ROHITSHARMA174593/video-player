import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  email: string;
  text: string;
  videoId: string; // 👈 NEW FIELD
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    email: { type: String, required: true },
    text: { type: String, required: true },
    videoId: { type: String, required: true }, // for video jisse ki har video ka ek alag id jaaye mongo per
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);
