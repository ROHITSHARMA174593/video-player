import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import Comment from "@/lib/Comment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  if (req.method === "DELETE") {
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) return res.status(404).json({ message: "Comment not found" });
      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  if (req.method === "PATCH") {
    const { newText } = req.body;

    if (!newText || typeof newText !== "string") {
      return res.status(400).json({ message: "New comment text is required" });
    }

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { text: newText },
        { new: true }
      );

      if (!updatedComment) return res.status(404).json({ message: "Comment not found" });
      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
