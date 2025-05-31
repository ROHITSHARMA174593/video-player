// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import Hls from "hls.js";
// import { IoIosSettings } from "react-icons/io";
// import { IoArrowBack } from "react-icons/io5";

// const Watch = () => {
//   const router = useRouter();
//   const { title, source } = router.query;
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hlsRef = useRef<Hls | null>(null);

//   const [showSettings, setShowSettings] = useState(false);
//   const [menuLevel, setMenuLevel] = useState<"main" | "quality">("main");
//   const [quality, setQuality] = useState<"1080p" | "480p">("1080p");
//   const [isHovered, setIsHovered] = useState(false);

//   // Screen width state for responsive quality availability
//   const [screenWidth, setScreenWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 0
//   );

//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Quality options with availability based on screenWidth
//   const qualities = [
//   { label: "360p", available: true, levelIndex: 0 },
//   { label: "480p", available: true, levelIndex: 1 },
//   { label: "720p", available: true, levelIndex: 2 },
//   { label: "1080p", available: true, levelIndex: 3 },
//   { label: "1440p", available: true, levelIndex: 4 },
// ];


//   useEffect(() => {
//     if (!source || typeof source !== "string") return;

//     if (videoRef.current) {
//       if (Hls.isSupported()) {
//         if (hlsRef.current) {
//           hlsRef.current.destroy();
//           hlsRef.current = null;
//         }
//         const hls = new Hls();
//         hlsRef.current = hls;

//         hls.loadSource(source);
//         hls.attachMedia(videoRef.current);

//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           videoRef.current?.play();

//           // Default quality based on screen width
//           const desiredQuality = screenWidth > 600 ? 1080 : 480;
//           const levelIndex = hls.levels.findIndex(
//             (level) => level.height === desiredQuality
//           );
//           if (levelIndex !== -1) {
//             hls.currentLevel = levelIndex;
//             setQuality(`${desiredQuality}p` as "1080p" | "480p");
//           }
//         });

//         return () => {
//           hls.destroy();
//           hlsRef.current = null;
//         };
//       } else if (
//         videoRef.current.canPlayType("application/vnd.apple.mpegurl")
//       ) {
//         videoRef.current.src = source;
//         videoRef.current.addEventListener("loadedmetadata", () => {
//           videoRef.current?.play();
//         });
//       }
//     }
//   }, [source, screenWidth]);

//   const toggleSettings = () => {
//     setShowSettings((prev) => !prev);
//     setMenuLevel("main");
//   };

//   const handleQualityChange = (q: "1080p" | "480p" | "360" | "720" | "1440") => {
//     if (!hlsRef.current) return;
//     const hls = hlsRef.current;

//     const levelIndex = hls.levels.findIndex((level) => {  
//       if (q === "1080p") return level.height === 1080;
//       else if (q === "480p") return level.height === 480;
//       else if(q === "360") return level.height === 360;
//       else if(q === "720") return level.height === 720;
//       else if(q === "1440") return level.height === 1440;
//       return false;
//     });

//     if (levelIndex !== -1) {
//       hls.currentLevel = levelIndex;
//       setQuality(q);
//       setShowSettings(false);
//       setMenuLevel("main");
//     } else {
//       alert(`${q} quality not available`);
//     }
//   };

//   return (
//     <div
//       className="relative max-w-4xl mx-auto flex items-center justify-center w-full h-screen"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false);
//         setShowSettings(false);
//       }}
//     >
//       <video ref={videoRef} controls className="w-full rounded-lg" playsInline />

//       {/* Settings icon: show only on hover */}
//       {isHovered && (
//         <button
//           onClick={toggleSettings}
//           className="absolute bottom-22 right-36 z-50 p-2 rounded-full bg-transparent bg-opacity-50 hover:bg-opacity-80 text-white cursor-pointer"
//           title="Settings"
//           style={{ width: 36, height: 36 }}
//           aria-label="Settings"
//         >
//           <IoIosSettings size={28} />
//         </button>
//       )}

//       {/* Settings panel */}
//       {showSettings && (
//         <div className="absolute bottom-36 right-24 bg-white bg-opacity-95 text-black rounded p-4 shadow-lg z-50 w-48">
//           {menuLevel === "main" && (
//             <>
//               <p className="font-bold text-lg mb-4">Settings</p>
//               <button
//                 onClick={() => setMenuLevel("quality")}
//                 className="w-full text-left px-2 py-1 rounded hover:bg-gray-200"
//               >
//                 Quality
//               </button>
//             </>
//           )}

//           {menuLevel === "quality" && (
//             <>
//               <div
//                 className="flex items-center mb-4 cursor-pointer"
//                 onClick={() => setMenuLevel("main")}
//               >
//                 <IoArrowBack className="text-xl mr-2" />
//                 <p className="font-bold text-lg">Quality</p>
//               </div>

//               {qualities.map(({ label, available, levelIndex }) => (
//                 <button
//                   key={label}
//                   onClick={() => {
//                     if (available) {
//                       hlsRef.current!.currentLevel = levelIndex;
//                       setQuality(label as "1080p" | "480p");
//                       setShowSettings(false);
//                       setMenuLevel("main");
//                     } else {
//                       alert("Quality not available");
//                     }
//                   }}
//                   className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
//                     quality === label ? "bg-gray-300 font-semibold" : ""
//                   } ${
//                     !available
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                   disabled={!available}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Watch;













// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import Hls from "hls.js";
// import { IoIosSettings } from "react-icons/io";
// import { IoArrowBack } from "react-icons/io5";

// const Watch = () => {
//   const router = useRouter();
//   const { title, source } = router.query;
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hlsRef = useRef<Hls | null>(null);

//   const [showSettings, setShowSettings] = useState(false);
//   const [menuLevel, setMenuLevel] = useState<"main" | "quality">("main");
//   const [quality, setQuality] = useState<string>("1080p");
//   const [isHovered, setIsHovered] = useState(false);

//   // Screen width state for responsive quality availability
//   const [screenWidth, setScreenWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 0
//   );

//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Quality options with availability based on screenWidth (all true now)
//   const qualities = [
//     { label: "360p", height: 360 },
//     { label: "480p", height: 480 },
//     { label: "720p", height: 720 },
//     { label: "1080p", height: 1080 },
//     { label: "1440p", height: 1440 },
//   ];

//   useEffect(() => {
//     if (!source || typeof source !== "string") return;

//     if (videoRef.current) {
//       if (Hls.isSupported()) {
//         if (hlsRef.current) {
//           hlsRef.current.destroy();
//           hlsRef.current = null;
//         }
//         const hls = new Hls();
//         hlsRef.current = hls;

//         hls.loadSource(source);
//         hls.attachMedia(videoRef.current);

//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           videoRef.current?.play();

//           // Default quality based on screen width
//           const defaultHeight = screenWidth > 600 ? 1080 : 480;
//           const levelIndex = hls.levels.findIndex(
//             (level) => level.height === defaultHeight
//           );

//           if (levelIndex !== -1) {
//             hls.currentLevel = levelIndex;
//             setQuality(`${defaultHeight}p`);
//           } else if (hls.levels.length > 0) {
//             // fallback to first available level if default not found
//             hls.currentLevel = 0;
//             setQuality(`${hls.levels[0].height}p`);
//           }
//         });

//         return () => {
//           hls.destroy();
//           hlsRef.current = null;
//         };
//       } else if (
//         videoRef.current.canPlayType("application/vnd.apple.mpegurl")
//       ) {
//         videoRef.current.src = source;
//         videoRef.current.addEventListener("loadedmetadata", () => {
//           videoRef.current?.play();
//         });
//       }
//     }
//   }, [source, screenWidth]);

//   const toggleSettings = () => {
//     setShowSettings((prev) => !prev);
//     setMenuLevel("main");
//   };

//   const handleQualityChange = (selectedLabel: string) => {
//   if (!hlsRef.current) return;
//   const hls = hlsRef.current;

//   const selectedQuality = qualities.find((q) => q.label === selectedLabel);
//   if (!selectedQuality) {
//     alert("Quality not found");
//     return;
//   }

//   // Find level with closest height to selectedQuality.height
//   let closestLevelIndex = -1;
//   let smallestDiff = Infinity;
//   hls.levels.forEach((level, index) => {
//     const diff = Math.abs(level.height - selectedQuality.height);
//     if (diff < smallestDiff) {
//       smallestDiff = diff;
//       closestLevelIndex = index;
//     }
//   });

//   if (closestLevelIndex !== -1) {
//     hls.currentLevel = closestLevelIndex;
//     setQuality(selectedLabel);
//     setShowSettings(false);
//     setMenuLevel("main");
//   } else {
//     alert(`${selectedLabel} quality not available`);
//   }
// };


//   return (
//     <div
//       className="relative max-w-4xl mx-auto flex items-center justify-center w-full h-screen"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false);
//         setShowSettings(false);
//       }}
//     >
//       <video ref={videoRef} controls className="w-full rounded-lg" playsInline />

//       {/* Settings icon: show only on hover */}
//       {isHovered && (
//         <button
//           onClick={toggleSettings}
//           className="absolute bottom-22 right-36 z-50 p-2 rounded-full bg-transparent bg-opacity-50 hover:bg-opacity-80 text-white cursor-pointer"
//           title="Settings"
//           style={{ width: 36, height: 36 }}
//           aria-label="Settings"
//         >
//           <IoIosSettings size={28} />
//         </button>
//       )}

//       {/* Settings panel */}
//       {showSettings && (
//         <div className="absolute bottom-36 right-24 bg-white bg-opacity-95 text-black rounded p-4 shadow-lg z-50 w-48">
//           {menuLevel === "main" && (
//             <>
//               <p className="font-bold text-lg mb-4">Settings</p>
//               <button
//                 onClick={() => setMenuLevel("quality")}
//                 className="w-full text-left px-2 py-1 rounded hover:bg-gray-200"
//               >
//                 Quality
//               </button>
//             </>
//           )}

//           {menuLevel === "quality" && (
//             <>
//               <div
//                 className="flex items-center mb-4 cursor-pointer"
//                 onClick={() => setMenuLevel("main")}
//               >
//                 <IoArrowBack className="text-xl mr-2" />
//                 <p className="font-bold text-lg">Quality</p>
//               </div>

//               {qualities.map(({ label }) => (
//                 <button
//                   key={label}
//                   onClick={() => handleQualityChange(label)}
//                   className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
//                     quality === label ? "bg-gray-300 font-semibold" : ""
//                   } cursor-pointer`}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Watch;























import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Hls from "hls.js";
import { IoIosSettings } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Watch = () => {
  const router = useRouter();
  const { title, source } = router.query;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [menuLevel, setMenuLevel] = useState<"main" | "quality">("main");
  const [quality, setQuality] = useState<string>("1080p");
  const [isHovered, setIsHovered] = useState(false);

  // Screen width state for responsive quality availability
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Quality options with availability based on screenWidth (all true now)
  const qualities = [
    { label: "360p", height: 360 },
    { label: "480p", height: 480 },
    { label: "720p", height: 720 },
    { label: "1080p", height: 1080 },
    { label: "1440p", height: 1440 },
  ];

  useEffect(() => {
    if (!source || typeof source !== "string") return;

    if (videoRef.current) {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        const hls = new Hls();
        hlsRef.current = hls;

        hls.loadSource(source);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();

          // Default quality based on screen width
          const defaultHeight = screenWidth > 600 ? 1080 : 480;
          const levelIndex = hls.levels.findIndex(
            (level) => level.height === defaultHeight
          );

          if (levelIndex !== -1) {
            hls.currentLevel = levelIndex;
            setQuality(`${defaultHeight}p`);
          } else if (hls.levels.length > 0) {
            // fallback to first available level if default not found
            hls.currentLevel = 0;
            setQuality(`${hls.levels[0].height}p`);
          }
        });

        return () => {
          hls.destroy();
          hlsRef.current = null;
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = source;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play();
        });
      }
    }
  }, [source, screenWidth]);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
    setMenuLevel("main");
  };

  const handleQualityChange = (selectedLabel: string) => {
  if (!hlsRef.current) return;
  const hls = hlsRef.current;

  const selectedQuality = qualities.find((q) => q.label === selectedLabel);
  if (!selectedQuality) {
    alert("Quality not found");
    return;
  }

  // Find level with closest height to selectedQuality.height
  let closestLevelIndex = -1;
  let smallestDiff = Infinity;
  hls.levels.forEach((level, index) => {
    const diff = Math.abs(level.height - selectedQuality.height);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestLevelIndex = index;
    }
  });

  if (closestLevelIndex !== -1) {
    hls.currentLevel = closestLevelIndex;
    setQuality(selectedLabel);
    setShowSettings(false);
    setMenuLevel("main");
  } else {
    alert(`${selectedLabel} quality not available`);
  }
};

// Double tap setting
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      if (e.key === "ArrowRight") {
        videoRef.current.currentTime += 10;
      } else if (e.key === "ArrowLeft") {
        videoRef.current.currentTime -= 10;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="relative max-w-4xl mx-auto flex items-center justify-center w-full h-screen"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSettings(false);
      }}
    >
      <video ref={videoRef} controls className="w-full rounded-lg" playsInline />

      {/* Settings icon: show only on hover */}
      {isHovered && (
        <button
          onClick={toggleSettings}
          className="absolute bottom-22 right-36 z-50 p-2 rounded-full bg-transparent bg-opacity-50 hover:bg-opacity-80 text-white cursor-pointer"
          title="Settings"
          style={{ width: 36, height: 36 }}
          aria-label="Settings"
        >
          <IoIosSettings size={28} />
        </button>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute bottom-36 right-24 bg-white bg-opacity-95 text-black rounded p-4 shadow-lg z-50 w-48">
          {menuLevel === "main" && (
            <>
              <p className="font-bold text-lg mb-4">Settings</p>
              <button
                onClick={() => setMenuLevel("quality")}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200"
              >
                Quality
              </button>
            </>
          )}

          {menuLevel === "quality" && (
            <>
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setMenuLevel("main")}
              >
                <IoArrowBack className="text-xl mr-2" />
                <p className="font-bold text-lg">Quality</p>
              </div>

              {qualities.map(({ label }) => (
                <button
                  key={label}
                  onClick={() => handleQualityChange(label)}
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
                    quality === label ? "bg-gray-300 font-semibold" : ""
                  } cursor-pointer`}
                >
                  {label}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Watch;







