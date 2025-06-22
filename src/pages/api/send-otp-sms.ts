// pages/api/send-otp-sms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, otp } = req.body;

  console.log("📞 Phone:", phone);
  console.log("🔐 OTP:", otp);
  console.log("📨 TWILIO_PHONE:", process.env.TWILIO_PHONE);

  if (!phone || !otp) return res.status(400).json({ message: "Missing phone or OTP" });

  try {
    const response = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE!,
      to: phone,
    });

    console.log("✅ Twilio Response:", response.sid);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ Twilio Error:", error?.message || error);
    return res.status(500).json({ message: "Failed to send SMS", error: error?.message });
  }
}
