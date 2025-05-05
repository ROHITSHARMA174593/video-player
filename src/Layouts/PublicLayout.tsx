"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiBell, FiMenu, FiHome, FiInfo } from "react-icons/fi";
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
  { href: "/about", label: "About", icon: <FiInfo className="text-xl" /> },
  { href: "/shorts", label: "Shorts", icon: <FiBell className="text-xl" /> },
  { href: "/trending", label: "Trending", icon: <FiBell className="text-xl" /> },
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  const Navbar = () => (
    <aside
      className={`rounded-tr-lg  bg-white shadow-md fixed top-[12%] left-0 h-[calc(100vh-64px)] transition-all duration-300 p-2 flex flex-col z-20 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="mb-6 flex flex-col items-center ">
        <div className="flex justify-between items-center gap-20">
          <h1
            className={`text-xl font-bold text-red-600 tracking-tight ${
              !isSidebarOpen && "hidden"
            }`}
          >
            YouStream
          </h1>
          <FiMenu
            className="text-xl cursor-pointer p-0"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = router.pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 py-2 px-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-100 text-red-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {icon}
              {isSidebarOpen && (
                <span className="text-sm font-medium">{label}</span>
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
      <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-30 h-16">
        <h2 className="font-semibold text-lg">Public Layout</h2>
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
                <button
                  onClick={() => {
                    signOut();
                    setShowLogout(false);
                  }}
                  className="absolute right-0 mt-2 bg-white text-black border border-gray-300 px-4 py-1 rounded-md shadow-md z-40"
                >
                  LogOut
                </button>
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

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* ✅ Topbar Wrapper */}
      <div className="z-30" id="div-topbar">
        <Topbar notifications={notifications} />
      </div>
  
      {/* ✅ Layout Wrapper */}
      <div className="flex  min-h-screen" id="div-layout-content">
        {/* Sidebar */}
        <Navbar />
  
        {/* Main Content */}
        <main
          className="transition-all duration-300 pr-4 pt-4"
          style={{
            paddingLeft: isSidebarOpen ? "16rem" : "5rem",
            marginTop: "4rem",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
