// lib/fal.ts
import * as fal from "@fal-ai/serverless-client";

export async function upscaleImage(
  imageBuffer: Buffer,
  scaleFactor: 2 | 4
): Promise<Buffer> {
  const apiKey = process.env.FAL_API_KEY;

  console.log("🔑 FAL_API_KEY check:", {
    exists: !!apiKey,
    length: apiKey?.length || 0,
    prefix: apiKey?.substring(0, 8) || "NONE",
  });

  if (!apiKey) {
    throw new Error("FAL_API_KEY is not defined in environment variables");
  }

  try {
    // Configure Fal.ai
    fal.config({
      credentials: apiKey,
    });

    console.log("🚀 Sending to Fal.ai:", {
      model: "fal-ai/recraft/upscale/crisp",
      scaleFactor,
      imageSize: imageBuffer.length,
    });

    // Upload image to Fal.ai storage first
    const imageUrl = await fal.storage.upload(imageBuffer);
    
    console.log("📤 Image uploaded to Fal.ai storage:", imageUrl.substring(0, 50) + "...");

    // Call Fal.ai upscaling API with image URL
    const result: any = await fal.subscribe("fal-ai/recraft/upscale/crisp", {
      input: {
        image_url: imageUrl,
        scale: scaleFactor,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("⏳ Upscaling in progress...");
        }
      },
    });

    console.log("✅ Fal.ai upscale complete");

    // 🔍 DEBUG: Log the entire response structure
    console.log("📋 Full response structure:", JSON.stringify(result, null, 2));

    // Try multiple possible paths for the image URL
    let upscaledImageUrl = 
      result.data?.image?.url ||           // Path 1
      result.image?.url ||                 // Path 2
      result.data?.url ||                  // Path 3
      result.url ||                        // Path 4
      result.data?.output?.url ||          // Path 5
      result.output?.url;                  // Path 6

    if (!upscaledImageUrl) {
      console.error("❌ No image URL found in response. Full result:", result);
      throw new Error("No image URL in Fal.ai response");
    }

    console.log("📥 Downloading upscaled image from:", upscaledImageUrl.substring(0, 50) + "...");

    // Download the upscaled image
    const imageResponse = await fetch(upscaledImageUrl);
    if (!imageResponse.ok) {
      throw new Error(
        `Failed to fetch upscaled image: ${imageResponse.status} ${imageResponse.statusText}`
      );
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);

    console.log("✅ Image downloaded successfully, size:", resultBuffer.length);

    return resultBuffer;
  } catch (error: any) {
    console.error("❌ Fal.ai API error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      body: error.body,
    });
    throw new Error(
      `Fal.ai upscale failed: ${error.message || "Unknown error"}`
    );
  }
}
