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

type LikeDislikeProps = {
  videoId: string;
  theme: "dark" | "light";
};

const LikeDislike = ({ videoId, theme }: LikeDislikeProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
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
  const [commentLikeCounts, setCommentLikeCounts] = useState<
    Record<string, number>
  >({});
  const [commentDislikeCounts, setCommentDislikeCounts] = useState<
    Record<string, number>
  >({});

  const getEmail = (): string | null => {
    if (!session || !session.user || !session.user.email) {
      setShowLoginPrompt(true);
      return null;
    }
    return session.user.email;
  };

  const fetchLikes = async () => {
    const email = getEmail();
    if (!email) return;

    try {
      const res = await fetch(`/api/likes/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          email,
          action: "get",
        }),
      });

      const data = await res.json();
      setLikeCount(data.likeCount || 0);
      setDislikeCount(data.dislikeCount || 0);
      setLiked(data.liked || false);
      setDisliked(data.disliked || false);
    } catch (err) {
      console.error("Error fetching like data:", err);
    }
  };

  const updateLikeStatus = async (action: "like" | "dislike" | "neutral") => {
    const email = getEmail();
    if (!email) return;

    try {
      const res = await fetch("/api/likes/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, email, action }),
      });
      const data = await res.json();
      setLikeCount(data.likeCount || 0);
      setDislikeCount(data.dislikeCount || 0);
      setLiked(data.liked || false);
      setDisliked(data.disliked || false);
    } catch (err) {
      console.error("Error updating like/dislike:", err);
    }
  };

  const handleLike = () => {
    if (!session) return setShowLoginPrompt(true);
    const nextAction = liked ? "neutral" : "like";
    updateLikeStatus(nextAction);
  };

  const handleDislike = () => {
    if (!session) return setShowLoginPrompt(true);
    const nextAction = disliked ? "neutral" : "dislike";
    updateLikeStatus(nextAction);
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

  const handleCommentSubmit = async () => {
    const email = getEmail();
    if (!email || !comment.trim()) return;

    try {
      await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, text: comment, videoId }),
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment?videoId=${videoId}`);
      const data = await res.json();
      setCommentsData(data);

      // Important: wait for setting state, then call like/dislike count
      setTimeout(() => {
        fetchCommentLikeDislikeCounts(); // call after comments loaded
      }, 0);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  //! Comment Section Like and Dislike Logic is starts from here

  const fetchCommentLikeDislikeCounts = async () => {
    const email = session?.user?.email || "";

    try {
      const ids = commentsData.map((c) => c._id);
      if (ids.length === 0) return;

      const url = `/api/commentlike/commentlike?${ids
        .map((id) => `commentIds=${id}`)
        .join("&")}&email=${email}`;

      const res = await fetch(url);
      const result = await res.json();

      if (!result.success || !result.data) return;

      const data = result.data;

      const likeSet = new Set<string>();
      const dislikeSet = new Set<string>();
      const likeCounter: Record<string, number> = {};
      const dislikeCounter: Record<string, number> = {};

      for (const commentId in data) {
        likeCounter[commentId] = data[commentId].likes || 0;
        dislikeCounter[commentId] = data[commentId].dislikes || 0;

        if (data[commentId].userAction === "like") likeSet.add(commentId);
        if (data[commentId].userAction === "dislike") dislikeSet.add(commentId);
      }

      setLikedComments(likeSet);
      setDislikedComments(dislikeSet);
      setCommentLikeCounts(likeCounter);
      setCommentDislikeCounts(dislikeCounter);
    } catch (err) {
      console.error("Error fetching comment like/dislike counts:", err);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    const email = getEmail();
    if (!email) return;

    try {
      const res = await fetch("/api/commentlike/commentlike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, email, action: "like" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCommentLikeDislikeCounts();
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const handleCommentDislike = async (commentId: string) => {
    const email = getEmail();
    if (!email) return;

    try {
      const res = await fetch("/api/commentlike/commentlike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, email, action: "dislike" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCommentLikeDislikeCounts();
      }
    } catch (err) {
      console.error("Error disliking comment:", err);
    }
  };

  useEffect(() => {
    if (videoId && session) {
      fetchLikes();
      fetchComments();
    }
  }, [videoId, session]);

  useEffect(() => {
    if (commentsData.length > 0 && session?.user?.email) {
      fetchCommentLikeDislikeCounts();
    }
  }, [commentsData, session]);

  //! Translate Function for Comment Section
  interface TranslatedComment {
    [commentId: string]: string;
  }
  const [translatedComment, setTranslatedComment] = useState<TranslatedComment>(
    {}
  );
  const [loadingTranslate, setLoadingTranslate] = useState<string | null>(null);
  const [showSeeOriginalo, setShowSeeOriginal] = useState<
    Record<string, boolean>
  >({});

  const handleTranslateFunc = async (
    commentId: string | number,
    text: string
  ): Promise<void> => {
    const safeID = String(commentId);

    // If already translated, toggle between original and translation
    if (translatedComment[safeID]) {
      setShowSeeOriginal((prev) => ({
        ...prev,
        [safeID]: !prev[safeID],
      }));
      return;
    }

    // If not translated yet, translate it
    setLoadingTranslate(safeID);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data: { translatedText: string } = await res.json();

      setTranslatedComment((prev) => ({
        ...prev,
        [safeID]: data.translatedText,
      }));

      setShowSeeOriginal((prev) => ({
        ...prev,
        [safeID]: false, // show translated by default
      }));

      console.log("Translation successful...");
    } catch (err) {
      console.log("Translation failed");
    } finally {
      setLoadingTranslate(null);
    }
  };

  return (
    <>
      <div
        className={` ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-200 text-black"
        } absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6   bg-opacity-30 px-4 py-2 rounded-xl z-50`}
      >
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          {liked ? (
            <FaThumbsUp
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            />
          ) : (
            <FaRegThumbsUp />
          )}
          <span className="text-sm">{likeCount}</span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          {disliked ? (
            <FaThumbsDown
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            />
          ) : (
            <FaRegThumbsDown />
          )}
          <span className="text-sm">{dislikeCount}</span>
        </button>

        <button
          onClick={toggleCommentBox}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          <FiMessageSquare />
          <span className="text-sm">Comments</span>
        </button>

        <button
          onClick={handleSaveButton}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          {savedButton ? <BsBookmarkFill /> : <BsBookmark />}
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            {savedButton ? "Saved" : "Save"}
          </span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform">
          <FiDownload />
          <span className="text-sm">Download</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div
          className={`${
            theme === "dark" ? "bg-[#101011] text-white" : "bg-white text-black"
          } flex flex-col mx-auto w-[80%] max-w-xl  bg-opacity-90 p-4 rounded-lg shadow-lg z-40`}
        >
          <div className="flex justify-between items-center mb-2">
            <h1
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold text-lg`}
            >
              Comment
            </h1>
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
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } w-full p-2 border border-gray-300 rounded mb-2`}
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowCommentBox(false)}
              className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
          {/*-------------------------------- Comment Data ----------------------- Comment Data ------------------------------------------------------------------------------*/}
          <div className="mt-4 space-y-4">
            {commentsData.map((curElem) => {
              const safeId = String(curElem._id);
              const translated = translatedComment[safeId];

              return (
                <div
                  key={safeId}
                  className="flex space-x-3 border-b border-gray-300 pb-3"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    {curElem.email?.charAt(0).toUpperCase() || "?"}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {curElem.email || "Anonymous"}
                      </span>
                    </div>

                    {/* Comment Text */}
                    <p
                      className={`mt-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {/* Convert Data in Translation and in Original */}
                      <p>
                        {translatedComment[safeId] && !showSeeOriginalo[safeId]
                          ? translatedComment[safeId]
                          : curElem.text}
                      </p>
                    </p>

                    {/* Translate Button */}
                    <button
                      onClick={() =>
                        handleTranslateFunc(curElem._id, curElem.text)
                      }
                      className="text-sm text-blue-600 hover:underline mt-1 disabled:opacity-50"
                      disabled={loadingTranslate === safeId}
                    >
                      {loadingTranslate === safeId
                        ? "Translating..."
                        : translatedComment[safeId]
                        ? showSeeOriginalo[safeId]
                          ? "See Translation"
                          : "See Original"
                        : "Translate"}
                    </button>

                    {/* Like / Dislike Buttons */}
                    <div className="flex gap-4 mt-2">
                      <button
                        className="flex items-center gap-1 hover:scale-110 transition-transform"
                        onClick={() => handleCommentLike(curElem._id)}
                      >
                        {likedComments.has(curElem._id) ? (
                          <FaThumbsUp className="text-blue-500" />
                        ) : (
                          <FaRegThumbsUp />
                        )}
                        <span className="text-sm">
                          {commentLikeCounts[curElem._id] || 0}
                        </span>
                      </button>

                      <button
                        className="flex items-center gap-1 hover:scale-110 transition-transform"
                        onClick={() => handleCommentDislike(curElem._id)}
                      >
                        {dislikedComments.has(curElem._id) ? (
                          <FaThumbsDown className="text-red-500" />
                        ) : (
                          <FaRegThumbsDown />
                        )}
                        <span className="text-sm">
                          {commentDislikeCounts[curElem._id] || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/*-------------------------------- Comment Data ----------------------- Comment Data ------------------------------------------------------------------------------*/}
        </div>
      )}

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
