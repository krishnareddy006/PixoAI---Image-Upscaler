// // import { auth } from "@clerk/nextjs/server";
// // import { prisma } from "@/lib/prisma";
// // import { upscaleImage } from "@/lib/clipdrop";
// // import { NextResponse } from "next/server";

// // export const maxDuration = 60; // 60 seconds timeout

// // export async function POST(req: Request) {
// //   try {
// //     const { userId } = await auth();

// //     if (!userId) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     console.log("🔵 Upscale request from user:", userId);

// //     // Get user and check credits
// //     const user = await prisma.user.findUnique({
// //       where: { clerkId: userId },
// //     });

// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     console.log("💰 User credits:", user.credits);

// //     if (user.credits < 1) {
// //       return NextResponse.json(
// //         { error: "Insufficient credits" },
// //         { status: 403 }
// //       );
// //     }

// //     // Parse form data
// //     const formData = await req.formData();
// //     const imageFile = formData.get("image") as File;
// //     const scaleFactorStr = formData.get("scaleFactor") as string;

// //     console.log("📤 Received:", {
// //       hasImage: !!imageFile,
// //       imageType: imageFile?.type,
// //       imageSize: imageFile?.size,
// //       scaleFactor: scaleFactorStr,
// //     });

// //     if (!imageFile) {
// //       return NextResponse.json({ error: "No image provided" }, { status: 400 });
// //     }

// //     if (!scaleFactorStr) {
// //       return NextResponse.json(
// //         { error: "No scale factor provided" },
// //         { status: 400 }
// //       );
// //     }

// //     const scaleFactor = parseInt(scaleFactorStr);
// //     if (![2, 4].includes(scaleFactor)) {
// //       return NextResponse.json(
// //         { error: "Scale factor must be 2 or 4" },
// //         { status: 400 }
// //       );
// //     }

// //     // Validate file type
// //     const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
// //     if (!validTypes.includes(imageFile.type)) {
// //       return NextResponse.json(
// //         { error: "Invalid file type. Please upload PNG, JPG, JPEG, or WebP" },
// //         { status: 400 }
// //       );
// //     }

// //     // Validate file size (10MB max)
// //     const maxSize = 10 * 1024 * 1024;
// //     if (imageFile.size > maxSize) {
// //       return NextResponse.json(
// //         { error: "File too large. Maximum size is 10MB" },
// //         { status: 400 }
// //       );
// //     }

// //     console.log("✅ Validation passed");

// //     // Convert File to Buffer
// //     const arrayBuffer = await imageFile.arrayBuffer();
// //     const buffer = Buffer.from(arrayBuffer);

// //     console.log("🚀 Starting upscale...");

// //     // Upscale the image
// //     const upscaledBuffer = await upscaleImage(buffer, scaleFactor as 2 | 4);

// //     console.log("✅ Upscale complete, deducting credit...");

// //     // Deduct credit
// //     await prisma.user.update({
// //       where: { id: user.id },
// //       data: { credits: { decrement: 1 } },
// //     });

// //     console.log(
// //       `✅ Credit deducted. Remaining: ${user.credits - 1}`
// //     );

// //     // Return the upscaled image
// //     return new NextResponse(upscaledBuffer, {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "image/png",
// //         "Content-Disposition": `attachment; filename="upscaled-${scaleFactor}x.png"`,
// //         "Content-Length": upscaledBuffer.length.toString(),
// //       },
// //     });
// //   } catch (error: any) {
// //     console.error("❌ Upscale API error:", error);
// //     return NextResponse.json(
// //       { error: error?.message || "Failed to upscale image" },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { upscaleImage } from "@/lib/clipdrop";
// import { NextResponse } from "next/server";

// export const maxDuration = 60; // 60 seconds timeout

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     console.log("🔵 Upscale request from user:", userId);

//     // Get user and check credits
//     const user = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("💰 User credits:", user.credits);

//     if (user.credits < 1) {
//       return NextResponse.json(
//         { error: "Insufficient credits" },
//         { status: 403 }
//       );
//     }

//     // Parse form data
//     const formData = await req.formData();
//     const imageFile = formData.get("image") as File;
//     const scaleFactorStr = formData.get("scaleFactor") as string;

//     console.log("📤 Received:", {
//       hasImage: !!imageFile,
//       imageType: imageFile?.type,
//       imageSize: imageFile?.size,
//       scaleFactor: scaleFactorStr,
//     });

//     if (!imageFile) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     if (!scaleFactorStr) {
//       return NextResponse.json(
//         { error: "No scale factor provided" },
//         { status: 400 }
//       );
//     }

//     const scaleFactor = parseInt(scaleFactorStr, 10);
//     if (![2, 4].includes(scaleFactor)) {
//       return NextResponse.json(
//         { error: "Scale factor must be 2 or 4" },
//         { status: 400 }
//       );
//     }

//     // Validate file type
//     const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//     if (!validTypes.includes(imageFile.type)) {
//       return NextResponse.json(
//         { error: "Invalid file type. Please upload PNG, JPG, JPEG, or WebP" },
//         { status: 400 }
//       );
//     }

//     // Validate file size (10MB max)
//     const maxSize = 10 * 1024 * 1024;
//     if (imageFile.size > maxSize) {
//       return NextResponse.json(
//         { error: "File too large. Maximum size is 10MB" },
//         { status: 400 }
//       );
//     }

//     console.log("✅ Validation passed");

//     // Convert File to Buffer
//     const inputArrayBuffer = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(inputArrayBuffer);

//     console.log("🚀 Starting upscale...");

//     // Upscale the image
//     const upscaledBuffer = await upscaleImage(buffer, scaleFactor as 2 | 4);

//     console.log("✅ Upscale complete, deducting credit...");

//     // Deduct credit
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { credits: { decrement: 1 } },
//     });

//     console.log(`✅ Credit deducted. Remaining: ${user.credits - 1}`);

//     // Return the upscaled image (use Uint8Array so it matches BodyInit)
//     return new NextResponse(new Uint8Array(upscaledBuffer), {
//       status: 200,
//       headers: {
//         "Content-Type": "image/png",
//         "Content-Disposition": `attachment; filename="upscaled-${scaleFactor}x.png"`,
//         "Content-Length": upscaledBuffer.length.toString(),
//       },
//     });
//   } catch (error: any) {
//     console.error("❌ Upscale API error:", error);
//     return NextResponse.json(
//       { error: error?.message || "Failed to upscale image" },
//       { status: 500 }
//     );
//   }
// }


import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { upscaleImage } from "@/lib/fal";  // Changed from clipdrop
import { NextResponse } from "next/server";

export const maxDuration = 120; // 120 seconds timeout (fal.ai can be slower)

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🔵 Upscale request from user:", userId);

    // Get user and check credits
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("💰 User credits:", user.credits);

    if (user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const scaleFactorStr = formData.get("scaleFactor") as string;

    console.log("📤 Received:", {
      hasImage: !!imageFile,
      imageType: imageFile?.type,
      imageSize: imageFile?.size,
      scaleFactor: scaleFactorStr,
    });

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!scaleFactorStr) {
      return NextResponse.json(
        { error: "No scale factor provided" },
        { status: 400 }
      );
    }

    const scaleFactor = parseInt(scaleFactorStr, 10);
    if (![2, 4].includes(scaleFactor)) {
      return NextResponse.json(
        { error: "Scale factor must be 2 or 4" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PNG, JPG, JPEG, or WebP" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    console.log("✅ Validation passed");

    // Convert File to Buffer
    const inputArrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(inputArrayBuffer);

    console.log("🚀 Starting upscale with Fal.ai...");

    // Upscale the image using Fal.ai
    const upscaledBuffer = await upscaleImage(buffer, scaleFactor as 2 | 4);

    console.log("✅ Upscale complete, deducting credit...");

    // Deduct credit
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } },
    });

    console.log(`✅ Credit deducted. Remaining: ${user.credits - 1}`);

    // Return the upscaled image
    return new NextResponse(new Uint8Array(upscaledBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="upscaled-${scaleFactor}x.png"`,
        "Content-Length": upscaledBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("❌ Upscale API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upscale image" },
      { status: 500 }
    );
  }
}
