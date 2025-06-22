// components/OTPForm.tsx
import { useState } from "react";

export default function OTPForm({ onVerified }: { onVerified: () => void }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const res = await fetch("/api/send-otp-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: formattedPhone, otp }),
    });

    if (res.ok) {
      console.log("📱 OTP sent successfully");
      setOtpSent(true);
      setTimeout(() => {
        onVerified(); // hide the popup after OTP sent
      }, 1000);
    } else {
      console.error("❌ OTP send failed");
    }
  };
  console.log(phone)

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      {!otpSent ? (
        <>
          <label className="block mb-2 font-medium text-gray-700">
            Enter your Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
            className="border px-3 py-2 rounded w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded w-full"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </>
      ) : (
        <p className="text-green-600 text-center">✅ OTP Sent to {phone}</p>
      )}
    </div>
  );
}
