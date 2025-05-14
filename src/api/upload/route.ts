import { NextApiRequest, NextApiResponse } from "next";
import {Files,Fields,formidable} from "formidable";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const form = formidable({
      uploadDir: UPLOAD_DIR,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
      filter: (part) => {
        return part.mimetype ? ALLOWED_MIME_TYPES.includes(part.mimetype) : false;
      },
      filename: (name, ext, part) => {
        const safeName = (part.originalFilename || "")
          .replace(/[^a-zA-Z0-9-_.]/g, "")
          .replace(/\.{2,}/g, "")
          .replace(/^\.+/g, "");
        return `${Date.now()}-${safeName}`;
      },
    });

    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No valid file uploaded", fields, files });
    }

    const publicUrl = `/uploads/${path.basename(file.filepath)}`;
    return res.status(200).json({ url: publicUrl });
  } catch (error: unknown) {
    if ((error as { code: string }).code === "ETOOBIG") {
      return res.status(413).json({ error: "File too large (max 5MB)" });
    }
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}