// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Find or create user
//     let user = await prisma.user.findUnique({
//       where: { clerkId: userId },
//       select: { id: true, credits: true },
//     });

//     // If user doesn't exist, create them with free credits
//     if (!user) {
//       console.log(`Creating user ${userId} in database...`);
//       user = await prisma.user.create({
//         data: {
//           clerkId: userId,
//           email: "", // Will be updated by webhook
//           credits: 10,
//         },
//         select: { id: true, credits: true },
//       });
//     }

//     return NextResponse.json({ credits: user.credits }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching credits:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Atomically find-or-create the user
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {}, // do not change anything on existing user here
      create: {
        clerkId: userId,
        // temporary unique email; Clerk webhook should later update this
        email: `${userId}@temp.pixoai.local`,
        credits: 10, // initial credits
      },
      select: {
        id: true,
        credits: true,
      },
    });

    return NextResponse.json({ credits: user.credits });
  } catch (error: any) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch credits",
        details: error.message,
      },
      { status: 500 },
    );
  }
}



