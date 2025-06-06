import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import Comment from "@/lib/Comment"; // This points to 'CommentSection' collection via Mongoose

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, text } = req.body;

    if (!email || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newComment = await Comment.create({ email, text });
      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ message: "Error saving comment", error });
    }
  }

  if (req.method === "GET") {
    try {
      const comments = await Comment.find().sort({ createdAt: -1 });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching comments", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
