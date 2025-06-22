import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const OTPForm = dynamic(() => import("@/components/OTPForm"), { ssr: false });

const Wrapper = ({ Component, pageProps }: AppProps) => {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("dark");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [shouldAskPhone, setShouldAskPhone] = useState(false);

  useEffect(() => {
    const checkThemeAndOtp = async () => {
      if (status !== "authenticated") {
        console.log("⛔ User not authenticated yet");
        return;
      }

      console.log("✅ Authenticated User:", session?.user);

      const geo = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      console.log("📍 Coordinates:", geo.coords.latitude, geo.coords.longitude);

      const res = await fetch(
        `/api/get-location?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}`
      );
      const { state } = await res.json();

      console.log("🗺️ User State from API:", state);

      const hour = new Date().getHours();
      console.log("⏰ Current Hour:", hour);

      const southStates = [
        "Tamil Nadu",
        "Kerala",
        "Karnataka",
        "Andhra Pradesh",
        "Telangana",
      ];
      const isSouth = southStates.includes(state);
      console.log("🌐 Is South India?", isSouth);

      const isBetween10And12 = hour >= 10 && hour <= 12;
      console.log("⏳ Is Between 10-12?", isBetween10And12);

      // Theme logic (optional for now)
      if (isSouth && isBetween10And12) {
        setTheme("light");
        document.documentElement.classList.remove("dark");
        console.log("🎨 Theme set to LIGHT");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
        console.log("🎨 Theme set to DARK");
      }

      const alreadyVerified = localStorage.getItem("otp-verified");
      console.log("🔐 OTP Verified (from localStorage)?", alreadyVerified);

      if (!alreadyVerified) {
        if (isSouth) {
          console.log("📩 Sending Email OTP...");
          const otp = Math.floor(100000 + Math.random() * 900000);

          await fetch("/api/send-email-otp", {
            method: "POST",
            body: JSON.stringify({ email: session.user?.email, otp }),
            headers: { "Content-Type": "application/json" },
          });

          localStorage.setItem("otp-verified", "true");
        } else {
          console.log("📲 Showing OTP popup (non-south + not verified)");
          setShouldAskPhone(true);
          setShowOtpPopup(true);
        }
      }
    };

    checkThemeAndOtp();
  }, [status]);

  return (
    <>
      {showOtpPopup && shouldAskPhone && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <OTPForm
            onVerified={() => {
              localStorage.setItem("otp-verified", "true");
              setShowOtpPopup(false);
            }}
          />
        </div>
      )}
      <Component {...pageProps} theme={theme} />
    </>
  );
};

export default function App(props: AppProps) {
  return (
    <SessionProvider session={props.pageProps.session}>
      <Wrapper {...props} />
    </SessionProvider>
  );
}
