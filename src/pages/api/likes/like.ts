import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import Like from "@/lib/Like";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const { videoId, email, action } = req.body;

    if (!videoId || !email) {
      return res.status(400).json({ error: "Missing videoId or email" });
    }

    const existing = await Like.findOne({ email, videoId });

    if (action === "get") {
      const likeCount = await Like.countDocuments({ videoId, liked: true });
      const dislikeCount = await Like.countDocuments({ videoId, disliked: true });

      return res.status(200).json({
        liked: existing?.liked || false,
        disliked: existing?.disliked || false,
        likeCount,
        dislikeCount,
      });
    }

    let updated;
    if (action === "like") {
      updated = await Like.findOneAndUpdate(
        { email, videoId },
        { liked: true, disliked: false },
        { upsert: true, new: true }
      );
    } else if (action === "dislike") {
      updated = await Like.findOneAndUpdate(
        { email, videoId },
        { liked: false, disliked: true },
        { upsert: true, new: true }
      );
    } else if (action === "neutral") {
      updated = await Like.findOneAndUpdate(
        { email, videoId },
        { liked: false, disliked: false },
        { new: true }
      );
    }

    const likeCount = await Like.countDocuments({ videoId, liked: true });
    const dislikeCount = await Like.countDocuments({ videoId, disliked: true });

    return res.status(200).json({
      liked: updated?.liked || false,
      disliked: updated?.disliked || false,
      likeCount,
      dislikeCount,
    });

  } catch (err) {
    console.error("❌ Like API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
