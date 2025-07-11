// pages/api/send-otp-sms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone } = req.body;

  if (!phone) return res.status(400).json({ message: "Phone number is required" });

  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    console.log("✅ OTP Sent to:", phone, "| Status:", verification.status);
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ Failed to send OTP:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
