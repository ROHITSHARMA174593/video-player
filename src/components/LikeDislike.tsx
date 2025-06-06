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
import { FiShare2, FiDownload, FiMessageSquare } from "react-icons/fi";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LikeDislike = () => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
    router.push("/"); // Redirect to homepage on cancel
  };

  return (
    <>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-6 text-white bg-black bg-opacity-30 px-4 py-2 rounded-xl z-50">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
        >
          {liked ? <FaThumbsUp className="text-blue-500" /> : <FaRegThumbsUp />}
          <span className="text-sm">Like</span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
        >
          {disliked ? (
            <FaThumbsDown className="text-red-500" />
          ) : (
            <FaRegThumbsDown />
          )}
          <span className="text-sm">Dislike</span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
          <FiMessageSquare />
          <span className="text-sm">Comments</span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
          <FiShare2 />
          <span className="text-sm">Share</span>
        </button>

        <button className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
          <FiDownload />
          <span className="text-sm">Download</span>
        </button>
      </div>

      {/* Login container (ye activate hoga jab user bina login kare like ya dislike karne ki koshish karega) */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80 text-center">
            <button
              className="absolute top-2 right-3 text-2xl font-bold cursor-pointer hover:text-red-600"
              onClick={handleCloseLoginPrompt}
              aria-label="Close login prompt"
            >
              &times; {/* Cross Button */}
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
