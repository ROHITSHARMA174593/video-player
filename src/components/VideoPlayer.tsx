import "video.js/dist/video-js.css";
import videojs from "video.js";
import { useEffect, useRef } from "react";

interface Props {
  src?: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = videojs(videoRef.current!, {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src,
          type: "application/x-mpegURL",
        },
      ],
    });

    player.ready(() => {
      const videoElement = videoRef.current; // asli <video> element

      if (!videoElement) {
        console.warn("Video element ref not available");
        return;
      }

      const playPromise = player.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(() => {
              if (videoElement.isConnected) {
                if (videoElement.requestFullscreen) {
                  videoElement.requestFullscreen();
                } else if ((videoElement as any).webkitRequestFullscreen) {
                  (videoElement as any).webkitRequestFullscreen();
                } else if ((videoElement as any).mozRequestFullScreen) {
                  (videoElement as any).mozRequestFullScreen();
                } else if ((videoElement as any).msRequestFullscreen) {
                  (videoElement as any).msRequestFullscreen();
                }
              } else {
                console.warn("Video element not connected to DOM.");
              }
            }, 100);
          })
          .catch((error) => {
            console.warn("Play or fullscreen request failed:", error);
          });
      }
    });

    return () => {
      player.dispose();
    };
  }, [src]);

  return (
    <video ref={videoRef} className="video-js vjs-default-skin" playsInline />
  );
}





