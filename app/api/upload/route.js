import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Reads CLOUDINARY_URL from the environment automatically.
cloudinary.config({ secure: true });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const res = await cloudinary.uploader.upload(fileUri, {
      folder: "kwik2travels",
    });

    return NextResponse.json({ url: res.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload to Cloudinary failed." },
      { status: 500 }
    );
  }
}
