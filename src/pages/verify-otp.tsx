import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false); // 👈 state to hide form after verification


  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const verifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("✅ OTP Verified!");
      setVerified(true);
      localStorage.setItem("otp-verified", "true");

      // 🕒 Remove message and optionally redirect after 2 sec
      setTimeout(() => {
        setMessage("");
        router.push("/");
      }, 2000);
    } else {
      setMessage("❌ Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        {!verified && (
          <>
            <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-2">Sent to: {phone}</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border px-3 py-2 rounded w-full mb-3"
            />
            <button
              onClick={verifyOtp}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Verify
            </button>
          </>
        )}

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
