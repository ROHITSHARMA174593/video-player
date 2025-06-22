"use client";

import OTPForm from "@/components/OTPForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiBell, FiMenu, FiHome } from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import { FaBookmark } from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { useSession, signIn, signOut } from "next-auth/react";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
};

type PublicLayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Home", icon: <FiHome className="text-xl" /> },
  {
    href: "/shorts",
    label: "Shorts",
    icon: <SiYoutubeshorts className="text-xl" />,
  },
  { href: "/saved", label: "Saved", icon: <FaBookmark className="text-xl" /> },
  {
    href: "/download",
    label: "Download",
    icon: <LiaDownloadSolid className="text-xl" />,
  },
];

const notifications: Notification[] = [
  {
    id: 1,
    title: "Welcome!",
    message: "This is a public notification.",
    time: "Just now",
  },
  {
    id: 2,
    title: "News Update",
    message: "Check out the latest update on our blog.",
    time: "1 hour ago",
  },
];

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginTime, setLoginTime] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [sessionStateChecked, setSessionStateChecked] = useState(false);

  // OTP verification
  const handlePostLogin = async () => {
  if (session && typeof window !== "undefined" && !sessionStateChecked) {
    console.log("OTP Logic Triggered ✅");

    const alreadyVerified = localStorage.getItem("otpVerified");
    console.log("otpVerified value in localStorage:", alreadyVerified);

    if (alreadyVerified === "true") return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("📍 Geolocation Success");
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);

        const res = await fetch(
          `/api/get-location?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );

        const data = await res.json();
        console.log("📦 Location API Response:", data);

        const state = data.state?.toLowerCase() || "";
        console.log("🧭 Detected State:", state);

        const southStates = [
          "tamil nadu",
          "kerala",
          "karnataka",
          "andhra pradesh",
          "telangana",
        ];

        if (southStates.includes(state)) {
          console.log("📩 Sending Email OTP...");
          await fetch("/api/send-email-otp", {
            method: "POST",
            body: JSON.stringify({ email: session.user?.email }),
            headers: { "Content-Type": "application/json" },
          });
          localStorage.setItem("otpVerified", "true");
        } else {
          console.log("📲 Showing OTP Form...");
          setShowOTPForm(true);
        }

        setSessionStateChecked(true);
      },
      (err) => {
        console.error("❌ Geolocation Error:", err);
      }
    );
  }
};

  useEffect(() => {
    handlePostLogin();

  }, [session, sessionStateChecked]);

  // Time
  useEffect(() => {
    if (status === "authenticated" && session) {
      const now = new Date();
      const formatteTime = now.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      setLoginTime(formatteTime);

      console.log("User logged in at (IST):", formatteTime);
    }
  }, [status, session]);

  const layoutStyle = {
    paddingLeft: isSidebarOpen ? "16.5rem" : "6rem",
    marginTop: "6rem",
    zIndex: 10,
  };

  //! __________________________________________________________________________________________________________________________________________
  console.log("Session Data:", session);
  //! __________________________________________________________________________________________________________________________________________

  const Navbar = () => (
    <aside
      className={`bg-white shadow-md fixed top-20 sm:top-20 left-0 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] transition-all duration-300 p-3 sm:p-4 flex flex-col z-20 ${
        isSidebarOpen ? "w-48 sm:w-64" : "w-16 sm:w-20"
      }`}
    >
      <div className="mb-4 sm:mb-6 flex flex-col items-center">
        <div className="flex justify-between items-center w-full gap-4 sm:gap-6 lg:gap-8">
          <h1
            className={`text-lg sm:text-2xl lg:text-2xl font-bold text-red-600 tracking-tight ${
              !isSidebarOpen && "hidden"
            }`}
          >
            YouStream
          </h1>
          <FiMenu
            className={`text-lg sm:text-2xl lg:text-2xl cursor-pointer sm:block hidden`}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>

      <nav className="flex flex-col gap-2 sm:gap-3">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = router.pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 sm:gap-4 py-2 px-2 sm:px-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-100 text-red-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {icon}
              {isSidebarOpen && (
                <span className="text-sm sm:text-base lg:text-lg font-medium">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  const Topbar = ({ notifications }: { notifications: Notification[] }) => {
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const userInitial = session?.user?.email?.[0].toUpperCase();

    return (
      <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-30 h-20 md:h-16">
        <h2 className="md:font-bold font-bold text-3xl md:text-2xl ">
          Video Player
        </h2>
        <div className="flex items-center gap-4 relative">
          <FiBell
            className="text-xl cursor-pointer"
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
          />
          {isNotificationsOpen && (
            <div className="absolute right-0 top-10 mt-1 w-72 bg-white border shadow-lg rounded-md z-40">
              <div className="p-3 border-b font-semibold">Notifications</div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((note) => (
                  <div key={note.id} className="p-3 border-b hover:bg-gray-50">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-gray-600">{note.message}</p>
                    <p className="text-xs text-gray-400">{note.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="bg-gray-700 text-white font-semibold w-9 h-9 rounded-full flex items-center justify-center text-sm"
              >
                {userInitial}
              </button>
              {showLogout && (
                <div className="w-40 h-16 absolute right-0 mt-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-md shadow-md z-40">
                  <div className="w-full flex justify-end">
                    <button
                      className="text-xl text-gray-500 hover:text-red-500 transition"
                      onClick={() => router.push("/")}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <button
                      onClick={() => {
                        localStorage.removeItem("otp-verified") // data remove karne ke liye
                        signOut();
                        setShowLogout(false);
                      }}
                    >
                      LogOut
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-white bg-black px-4 py-1 rounded-md hover:bg-gray-800 transition"
            >
              Login
            </button>
          )}
        </div>
      </header>
    );
  };

  type OTPFormProps = {
    onVerified: () => void;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="z-30" id="div-topbar">
        <Topbar notifications={notifications} />
      </div>

      {showOTPForm && (
        <OTPForm
          onVerified={() => {
            setShowOTPForm(false);
            localStorage.setItem("otpVerified", "true");
          }}
        />
      )}

      <div className="flex  min-h-screen" id="div-layout-content">
        <Navbar />

        <main
          className="transition-all duration-300 flex w-full"
          style={layoutStyle}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
