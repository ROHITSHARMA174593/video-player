import { dbConnect } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import CommentLike from "@/lib/CommentLike";
import Comment from "@/lib/Comment"; // 🛠️ Comment delete ke liye zaruri

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { commentId, email, action } = req.body;

      if (action === "getAll" && email) {
        const all = await CommentLike.find({ email });
        return res.status(200).json({ success: true, data: all });
      }

      if (!commentId || !email || !["like", "dislike"].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid Request" });
      }

      const existing = await CommentLike.findOne({ commentId, email });

      if (existing) {
        if (existing.action === action) {
          await CommentLike.deleteOne({ _id: existing._id });
          return res.status(200).json({ success: true, message: "Removed existing like/dislike" });
        } else {
          existing.action = action;
          await existing.save();
          return res.status(200).json({ success: true, message: "Updated to opposite action" });
        }
      } else {
        const newEntry = new CommentLike({ commentId, email, action });
        await newEntry.save();

        // 🛑 Auto-delete comment on 2 dislikes
        if (action === "dislike") {
          const totalDislikes = await CommentLike.countDocuments({ commentId, action: "dislike" });

          if (totalDislikes >= 2) {
            await Comment.findByIdAndDelete(commentId);
            await CommentLike.deleteMany({ commentId });

            return res.status(200).json({
              success: true,
              deleted: true,
              message: "Comment deleted due to 2 dislikes",
            });
          }
        }

        return res.status(201).json({ success: true, message: "Like/Dislike added" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { commentId, email, commentIds } = req.query;

      // 🔹 Single comment fetch
      if (commentId && typeof commentId === "string") {
        const likes = await CommentLike.countDocuments({ commentId, action: "like" });
        const dislikes = await CommentLike.countDocuments({ commentId, action: "dislike" });

        let userAction: "like" | "dislike" | null = null;

        if (email && typeof email === "string") {
          const existing = await CommentLike.findOne({ commentId, email });
          userAction = existing ? (existing.action as "like" | "dislike") : null;
        }

        return res.status(200).json({ success: true, likes, dislikes, userAction });
      }

      // 🔹 Multiple comment fetch (bulk)
      if (Array.isArray(commentIds)) {
        const results: Record<string, any> = {};

        for (const id of commentIds) {
          const likes = await CommentLike.countDocuments({ commentId: id, action: "like" });
          const dislikes = await CommentLike.countDocuments({ commentId: id, action: "dislike" });

          let userAction: "like" | "dislike" | null = null;

          if (email && typeof email === "string") {
            const existing = await CommentLike.findOne({ commentId: id, email });
            userAction = existing ? (existing.action as "like" | "dislike") : null;
          }

          results[id] = { likes, dislikes, userAction };
        }

        return res.status(200).json({ success: true, data: results });
      }

      return res.status(400).json({ success: false, message: "Invalid Request" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Error fetching like data" });
    }
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
