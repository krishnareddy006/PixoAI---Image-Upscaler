// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-02-24.acacia",
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { priceId, credits } = await req.json();

//     if (!priceId || !credits) {
//       return NextResponse.json(
//         { error: "Missing priceId or credits" },
//         { status: 400 }
//       );
//     }

//     // Get user from database
//     const user = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("🛒 Creating checkout session:", {
//       userId: user.id,
//       clerkId: userId,
//       email: user.email || "No email",
//       credits,
//       priceId,
//     });

//     // Prepare checkout session config
//     const sessionConfig: Stripe.Checkout.SessionCreateParams = {
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
//       metadata: {
//         userId: user.id, // Database user ID (not Clerk ID)
//         credits: credits.toString(),
//       },
//     };

//     // Only add customer_email if user has an email
//     if (user.email && user.email.trim() !== "") {
//       sessionConfig.customer_email = user.email;
//     }

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create(sessionConfig);

//     console.log("✅ Checkout session created:", {
//       sessionId: session.id,
//       url: session.url,
//       metadata: session.metadata,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     console.error("❌ Stripe checkout error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to create checkout session" },
//       { status: 500 }
//     );
//   }
// }

// app/api/dodo/create-payment-link/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { createPaymentLink } from "@/lib/dodo";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { productId, credits } = await req.json();

//     if (!productId || !credits) {
//       return NextResponse.json(
//         { error: "Missing productId or credits" },
//         { status: 400 }
//       );
//     }

//     console.log("🛒 Creating payment link for user:", userId);

//     // Get user from database
//     const user = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("💳 Payment link request:", {
//       userId: user.id,
//       email: user.email,
//       credits,
//       productId,
//     });

//     // Create payment link using Dodo
//     const { paymentLink, paymentId } = await createPaymentLink({
//       productId,
//       credits,
//       userId: user.id,
//       email: user.email,
//     });

//     console.log("✅ Payment link created:", {
//       paymentId,
//       paymentLink: paymentLink.substring(0, 50) + "...",
//     });

//     return NextResponse.json({ url: paymentLink });
//   } catch (error: any) {
//     console.error("❌ Payment link creation error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to create payment link" },
//       { status: 500 }
//     );
//   }
// }



import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPaymentLink } from "@/lib/dodo";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, credits } = await req.json();

    if (!productId || !credits) {
      return NextResponse.json(
        { error: "Missing productId or credits" },
        { status: 400 }
      );
    }

    console.log("🛒 Creating payment link for user:", userId);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("💳 Payment link request:", {
      userId: user.id,
      email: user.email,
      credits,
      productId,
    });

    // Create payment link using Dodo
    const { paymentLink, paymentId } = await createPaymentLink({
      productId,
      credits,
      userId: user.id,
      email: user.email,
    });

    console.log("✅ Payment link created:", {
      paymentId,
      paymentLink: paymentLink.substring(0, 50) + "...",
    });

    // ✅ CREATE TRANSACTION RECORD (MATCHING YOUR SCHEMA)
    try {
      await prisma.transaction.create({
        data: {
          userId: user.id,
          dodoPaymentId: paymentId,
          amount: credits,
          credits: credits,
          status: "pending",
        },
      });
      console.log("📝 Transaction record created:", paymentId);
    } catch (txError: any) {
      console.error("⚠️ Failed to create transaction record:", txError.message);
      // Continue anyway - webhook will handle it
    }

    return NextResponse.json({ url: paymentLink });
  } catch (error: any) {
    console.error("❌ Payment link creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment link" },
      { status: 500 }
    );
  }
}
