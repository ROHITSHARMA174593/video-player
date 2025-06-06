import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  email: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    email: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);
