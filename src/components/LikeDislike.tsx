"use client";

import { useEffect, useState } from "react";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import { FiDownload, FiMessageSquare } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface LikeDislikeProps {
  videoId: string;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({ videoId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [savedButton, setSavedButton] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState<
    { _id: string; email: string; text: string; createdAt: string }[]
  >([]);

  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [dislikedComments, setDislikedComments] = useState<Set<string>>(
    new Set()
  );

  const handleLike = () => {
    if (!session) return setShowLoginPrompt(true);
    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    if (!session) return setShowLoginPrompt(true);
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);
  };

  const handleSaveButton = () => {
    if (!session) return setShowLoginPrompt(true);
    setSavedButton((prev) => !prev);
  };

  const toggleCommentBox = () => {
    if (!session) return setShowLoginPrompt(true);
    setShowCommentBox((prev) => !prev);
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
    router.push("/");
  };

  const handleCommentLike = (commentId: string) => {
    if (!session) return setShowLoginPrompt(true);
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
        setDislikedComments((prevDisliked) => {
          const newDisliked = new Set(prevDisliked);
          newDisliked.delete(commentId);
          return newDisliked;
        });
      }
      return newSet;
    });
  };

  const handleCommentDislike = (commentId: string) => {
    if (!session) return setShowLoginPrompt(true);
    setDislikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
        setLikedComments((prevLiked) => {
          const newLiked = new Set(prevLiked);
          newLiked.delete(commentId);
          return newLiked;
        });
      }
      return newSet;
    });
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !session?.user?.email || !videoId) return;

    try {
      await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          text: comment,
          videoId,
        }),
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  //! Comment Fetching is Here ()
  const fetchComments = async () => {
    if (!videoId) return;
    try {
      const res = await fetch(`/api/comment?videoId=${videoId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setCommentsData(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <>
      {/* Action Buttons Bar */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-6 text-black bg-gray-200 bg-opacity-30 px-4 py-2 rounded-xl z-50">
        <button onClick={handleLike} className="flex items-center gap-1 hover:scale-110 transition-transform">
          {liked ? <FaThumbsUp className="text-black" /> : <FaRegThumbsUp />}
          <span className="text-sm">Like</span>
        </button>

        <button onClick={handleDislike} className="flex items-center gap-1 hover:scale-110 transition-transform">
          {disliked ? <FaThumbsDown className="text-black" /> : <FaRegThumbsDown />}
          <span className="text-sm">Dislike</span>
        </button>

        <button onClick={toggleCommentBox} className="flex items-center gap-1 hover:scale-110 transition-transform">
          <FiMessageSquare />
          <span className="text-sm">Comments</span>
        </button>

        <button onClick={handleSaveButton} className="flex items-center gap-1 hover:scale-110 transition-transform">
          {savedButton ? <BsBookmarkFill /> : <BsBookmark />}
          <span className="text-sm">{savedButton ? "Saved" : "Save"}</span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform">
          <FiDownload />
          <span className="text-sm">Download</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="flex flex-col mx-auto w-[80%] max-w-xl bg-white bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-black font-semibold text-lg">Comment</h1>
            <button
              onClick={() => setShowCommentBox(false)}
              className="text-black hover:text-gray-600 transition text-2xl"
            >
              <RxCross2 />
            </button>
          </div>

          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowCommentBox(false)}
              className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Submit
            </button>
          </div>

          {/* Comments List */}
          <div className="mt-4 space-y-4">
            {commentsData.map((curElem) => (
              <div key={curElem._id} className="flex space-x-3 border-b border-gray-300 pb-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {curElem.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{curElem.email}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(curElem.createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-800">{curElem.text}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleCommentLike(curElem._id)}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      {likedComments.has(curElem._id) ? (
                        <FaThumbsUp className="text-blue-500" />
                      ) : (
                        <FaRegThumbsUp />
                      )}
                      <span className="text-sm">Like</span>
                    </button>
                    <button
                      onClick={() => handleCommentDislike(curElem._id)}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      {dislikedComments.has(curElem._id) ? (
                        <FaThumbsDown className="text-red-500" />
                      ) : (
                        <FaRegThumbsDown />
                      )}
                      <span className="text-sm">Dislike</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80 text-center">
            <button
              className="absolute top-2 right-3 text-2xl font-bold cursor-pointer hover:text-red-600"
              onClick={handleCloseLoginPrompt}
            >
              &times;
            </button>
            <h2 className="mb-4 font-semibold text-lg">Please Login</h2>
            <button
              onClick={() => signIn()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LikeDislike;
