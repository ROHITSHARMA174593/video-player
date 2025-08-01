// pages/Watch.tsx
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Hls from "hls.js";
import { IoIosSettings } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import LikeDislike from "@/components/LikeDislike";
import { redirect } from "next/navigation";

type WatchPageTheme = {
  theme : "light" | "dark"; // from _app.tsx file
}

const Watch = ({theme} : WatchPageTheme) => {
  const router = useRouter();
  const { videoId, title, source } = router.query;
  const safeVideoId = Array.isArray(videoId) ? videoId[0] : videoId; 

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [menuLevel, setMenuLevel] = useState<"main" | "quality">("main");
  const [quality, setQuality] = useState<string>("1080p");
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

          const defaultHeight = screenWidth > 600 ? 1080 : 480;
          const levelIndex = hls.levels.findIndex(
            (level) => level.height === defaultHeight
          );

          if (levelIndex !== -1) {
            hls.currentLevel = levelIndex;
            setQuality(`${defaultHeight}p`);
          } else if (hls.levels.length > 0) {
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
    if (!selectedQuality) return;

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
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      if (e.key === "ArrowRight") videoRef.current.currentTime += 10;
      else if (e.key === "ArrowLeft") videoRef.current.currentTime -= 10;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
  <div className={`${theme === "dark" ? "bg-[#181a1d]" : "bg-white"} m-0`}>
    <div
      className={`${theme === "dark" ? "bg-[#181a1d]" : "bg-white"}  relative max-w-4xl mx-auto flex items-start mt-0 pt-4 justify-center w-full h-screen`}
    >
      {/* 👇 Wrapping the entire hover area */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowSettings(false);
        }}
        className="relative w-full h-full"
      >
        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg"
          playsInline
        />

        {/* Settings Icon */}
        {isHovered && (
          <button
            onClick={toggleSettings}
            className="absolute bottom-[21.45vh] right-55 z-50 p-2 rounded-full bg-transparent bg-opacity-50 hover:bg-opacity-80 text-white cursor-pointer"
            style={{ width: 36, height: 36 }}
            aria-label="Settings"
          >
            <IoIosSettings size={28} />
          </button>
        )}

        {/* Back Button */}
        {isHovered && (
          <button
            onClick={() => router.push("/")}
            className="absolute top-[2.45vh] left-10 z-50 p-2 rounded-full bg-transparent bg-opacity-50 hover:bg-opacity-80 text-white cursor-pointer text-2xl"
          >
            <FaArrowLeftLong />
          </button>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-36 right-24 bg-white bg-opacity-95 text-black rounded p-4 shadow-lg z-50 w-48">
            {menuLevel === "main" && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg mb-4">Settings</p>
                  <button onClick={() => setShowSettings(false)} className="cursor-pointer">
                    <FaArrowLeftLong />
                  </button>
                </div>
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
    </div>

    {/* Like/Dislike & Saved Section */}
    {safeVideoId && <LikeDislike  videoId={safeVideoId} theme={theme}/>}
  </div>
);

};

export default Watch;
