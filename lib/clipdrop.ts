import axios from "axios";

export async function upscaleImage(
  imageBuffer: Buffer,
  scaleFactor: 2 | 4
): Promise<Buffer> {
  const apiKey = process.env.CLIPDROP_API_KEY;

  if (!apiKey) {
    throw new Error("CLIPDROP_API_KEY is not defined");
  }

  try {
    const FormData = require("form-data");
    const form = new FormData();

    // Append image file
    form.append("image_file", imageBuffer, {
      filename: "image.png",
      contentType: "image/png",
    });

    // Target dimensions (must be numbers, not strings)
    const targetSize = 1024 * scaleFactor;
    form.append("target_width", targetSize);
    form.append("target_height", targetSize);

    console.log("Sending to Clipdrop:", {
      target_width: targetSize,
      target_height: targetSize,
      imageSize: imageBuffer.length,
    });

    const response = await axios.post(
      "https://clipdrop-api.co/image-upscaling/v1/upscale",
      form,
      {
        headers: {
          "x-api-key": apiKey,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    console.log("✅ Clipdrop API success");
    return Buffer.from(response.data);
  } catch (error: any) {
    console.error("❌ Clipdrop API error:", {
      status: error.response?.status,
      data: error.response?.data?.toString(),
      message: error.message,
    });
    throw new Error(
      `Clipdrop API error: ${error.response?.statusText || error.message}`
    );
  }
}
