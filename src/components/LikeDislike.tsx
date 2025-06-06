// import { useState } from "react";
// import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
// import { FiShare2, FiDownload, FiMessageSquare } from "react-icons/fi";
// import { useSession, signIn, signOut } from "next-auth/react";

// const LikeDislike = () => {
//   const { data: session } = useSession();
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);

//   const handleLike = () => {
//     if (!session) {
//       signIn(); // Agar login nahi to popup dikhao
//       return;
//     }
//     setLiked((prev) => !prev);
//     if (disliked) setDisliked(false);
//   };

//   const handleDislike = () => {
//     if (!session) {
//       signIn();
//       return;
//     }
//     setDisliked((prev) => !prev);
//     if (liked) setLiked(false);
//   };

//   return (
//     <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-6 text-white bg-black bg-opacity-30 px-4 py-2 rounded-xl z-50">
//       <button
//         onClick={handleLike}
//         className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
//       >
//         {liked ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
//         <span className="text-sm">Like</span>
//       </button>

//       <button
//         onClick={handleDislike}
//         className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
//       >
//         {disliked ? <FaThumbsDown className="text-red-500" /> : <FaRegThumbsDown />}
//         <span className="text-sm">Dislike</span>
//       </button>

//       <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
//         <FiMessageSquare />
//         <span className="text-sm">Comments</span>
//       </button>

//       <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
//         <FiShare2 />
//         <span className="text-sm">Share</span>
//       </button>

//       <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
//         <FiDownload />
//         <span className="text-sm">Download</span>
//       </button>
//     </div>
//   );
// };

// export default LikeDislike;










"use client";

import { useState } from "react";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import { FiDownload, FiMessageSquare } from "react-icons/fi";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const LikeDislike = () => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [savedButton, setSavedButton] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  // Comment Section States
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<
    { _id: string; email: string; text: string; createdAt: string }[]
  >([]); // Saved comments ka list

  const router = useRouter();

  const handleLike = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
    router.push("/");
  };

  const handleSaveButton = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    setSavedButton((prev) => !prev);
  };

  const toggleCommentBox = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    setShowCommentBox((prev) => !prev);
  };

  // Comment Section Data on MONGODB

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !session?.user?.email) return;

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          text: comment, // ye hmaari text area field ki useState hai jisko hum hmaare MongoDB ke Schema me set karva rhe hai 
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]); // Show new comment
        setComment("");
        setShowCommentBox(true);
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <>
      {/* Action Buttons Bar */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-6 text-white bg-black bg-opacity-30 px-4 py-2 rounded-xl z-50">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          {liked ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
          <span className="text-sm">Like</span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-1 hover:scale-110 transition-transform"
        >
          {disliked ? (
            <FaThumbsDown className="text-red-500" />
          ) : (
            <FaRegThumbsDown />
          )}
          <span className="text-sm">Dislike</span>
        </button>

        <button
          className="flex items-center gap-1 hover:scale-110 transition-transform"
          onClick={toggleCommentBox}
        >
          <FiMessageSquare />
          <span className="text-sm">Comments</span>
        </button>

        <button
          className="flex items-center gap-1 hover:scale-110 transition-transform"
          onClick={handleSaveButton}
        >
          {savedButton ? <BsBookmarkFill /> : <BsBookmark />}
          <span className="text-sm">{savedButton ? "Saved" : "Save"}</span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform">
          <FiDownload />
          <span className="text-sm">Download</span>
        </button>
      </div>

      {/* Comment Box  */}
      {showCommentBox && (
        <div className="flex flex-col mx-auto w-[80%] max-w-xl bg-white bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
          {/* Header with left-aligned "Comment" and right-aligned cross icon */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-black font-semibold text-lg">Comment</h1>

            <button
              onClick={() => setShowCommentBox(false)}
              aria-label="Close comment box"
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
              onClick={handleCommentSubmit} // Check Out This Function
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Login Prompt Overlay */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80 text-center">
            <button
              className="absolute top-2 right-3 text-2xl font-bold cursor-pointer hover:text-red-600"
              onClick={handleCloseLoginPrompt}
              aria-label="Close login prompt"
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
