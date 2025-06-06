// import "@/styles/globals.css";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import "video.js/dist/video-js.css"; // ✅ Video.js ka CSS import

// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }




// src/pages/_app.tsx
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video.js/dist/video-js.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
  const checkTheme = async () => {
    try {
      const geo = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const lat = geo.coords.latitude;
      const lon = geo.coords.longitude;

      const res = await fetch(`/api/get-location?lat=${lat}&lon=${lon}`);
      const { state } = await res.json();

      const now = new Date();
      const hour = now.getHours();

      const southStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];
      const isSouth = southStates.includes(state);
      const isBetween10And12 = hour >= 10 && hour <= 12;

      // ✅ Console logs for debugging
      console.log("User location state:", state);
      if (isSouth) {
        console.log("✅ South Indian user detected");
      } else {
        console.log("🧭 Non-South Indian user");
      }

      if (isSouth && isBetween10And12) {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }

    } catch (err) {
      console.error("Theme detection failed:", err);
    }
  };

  checkTheme();
}, []);


  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} theme={theme} />
    </SessionProvider>
  );
}
