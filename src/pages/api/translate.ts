import type { NextApiRequest, NextApiResponse } from "next";
import translate from 'translate-google'; // read src/translate-google.d.ts file 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ translatedText?: string; error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  console.log("📨 Incoming text:", text);

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid text input" });
  }

  try {
    const translated = await translate(text, { from: "hi", to: "en" });
    console.log("✅ Translated:", translated);
    return res.status(200).json({ translatedText: translated });
  } catch (error) {
    console.error("❌ Translation error:", error);
    return res.status(500).json({ error: "Translation failed" });
  }
}
