import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import Comment from "@/lib/Comment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, text, videoId } = req.body;

    if (!videoId || !email || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newComment = await Comment.create({ email, text, videoId });
      return res.status(201).json(newComment);
    } catch (error) {
      console.error("Error in Comment Saving : ",error)
      return res.status(500).json({ message: "Error saving comment", error });
    }
  }

  if (req.method === "GET") {
    const { videoId } = req.query;

    if (!videoId || typeof videoId !== "string") {
      return res.status(400).json({ message: "videoId query param is required" });
    }

    try {
      const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching comments", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
