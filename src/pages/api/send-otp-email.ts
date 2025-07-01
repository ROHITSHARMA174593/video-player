// pages/api/send-otp-email.ts
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;
  console.log(email, otp)

  if (!email || !otp) {
    return res.status(400).json({ message: "Missing email or OTP" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
