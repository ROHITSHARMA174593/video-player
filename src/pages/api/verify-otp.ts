// pages/api/verify-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verificationChecks.create({
        to: phone,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error: any) {
    console.error("❌ OTP verification failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
