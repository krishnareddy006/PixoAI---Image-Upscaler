// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";

// // Explicitly type Stripe with the version your SDK supports
// type StripeApiVersion = "2025-02-24.acacia";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-02-24.acacia" as StripeApiVersion,
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: Request) {
//   try {
//     const body = await req.text();
//     const headersList = await headers();
//     const signature = headersList.get("stripe-signature");

//     if (!signature) {
//       console.error("❌ No Stripe signature found");
//       return NextResponse.json({ error: "No signature" }, { status: 400 });
//     }

//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//     } catch (err: any) {
//       console.error("❌ Webhook signature verification failed:", err.message);
//       return NextResponse.json(
//         { error: `Webhook Error: ${err.message}` },
//         { status: 400 }
//       );
//     }

//     console.log("✅ Webhook event received:", event.type);

//     // Handle successful payment
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
      
//       console.log("💳 Checkout session completed:", {
//         sessionId: session.id,
//         metadata: session.metadata,
//       });

//       const { userId, credits } = session.metadata || {};

//       if (!userId || !credits) {
//         console.error("❌ Missing metadata:", { userId, credits });
//         return NextResponse.json(
//           { error: "Missing userId or credits in metadata" },
//           { status: 400 }
//         );
//       }

//       try {
//         // Update user credits
//         const updatedUser = await prisma.user.update({
//           where: { id: userId },
//           data: {
//             credits: {
//               increment: parseInt(credits),
//             },
//           },
//         });

//         console.log(
//           `✅ Successfully added ${credits} credits to user ${userId}`
//         );
//         console.log(`💰 New credit balance: ${updatedUser.credits}`);

//         return NextResponse.json({
//           received: true,
//           creditsAdded: parseInt(credits),
//           newBalance: updatedUser.credits,
//         });
//       } catch (error: any) {
//         console.error("❌ Database error:", error);
//         return NextResponse.json(
//           { error: "Failed to update credits in database" },
//           { status: 500 }
//         );
//       }
//     }

//     // Return success for other event types
//     return NextResponse.json({ received: true });
//   } catch (error: any) {
//     console.error("❌ Webhook handler error:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "@/lib/prisma";

const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("DODO_PAYMENTS_WEBHOOK_SECRET is not defined");
}

const webhook = new Webhook(webhookSecret);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    console.log("📨 Webhook received headers:", webhookHeaders);

    // 1) Verify signature
    let verifiedPayload: any;
    try {
      verifiedPayload = await webhook.verify(body, webhookHeaders);
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // 2) Parse event
    const event = JSON.parse(body);
    console.log("✅ Webhook verified. Raw event:", event);

    const eventType = event.type;
    // Dodo docs use names like payment.succeeded / payment.failed.[web:40][web:16]
    console.log("📌 Event type:", eventType);

    // 3) Normalize payment object & metadata based on Dodo webhook shape:
    // Example documented shape (simplified): 
    // {
    //   type: "payment.succeeded",
    //   data: {
    //     payment: { id, status, ... },
    //     customer: { ... },
    //     metadata: { userId, credits }
    //   }
    // }
    const payment = event?.data?.payment || event?.data; // fallback if library flattens
    const metadata = event?.data?.metadata || payment?.metadata || {};

    console.log("🧾 Parsed payment:", {
      id: payment?.id,
      status: payment?.status,
      metadata,
    });

    const userId = metadata?.userId;
    const creditsStr = metadata?.credits;

    // 4) Handle successful payments
    if (eventType === "payment.succeeded" || eventType === "payment.completed") {
      if (!payment?.id) {
        console.error("❌ Missing payment.id in webhook payload");
        return NextResponse.json(
          { error: "Missing payment id in payload" },
          { status: 400 }
        );
      }

      if (!userId || !creditsStr) {
        console.error("❌ Missing metadata userId or credits:", { userId, creditsStr });
        return NextResponse.json(
          { error: "Missing userId or credits in metadata" },
          { status: 400 }
        );
      }

      const credits = parseInt(creditsStr, 10);
      if (Number.isNaN(credits) || credits <= 0) {
        console.error("❌ Invalid credits value in metadata:", creditsStr);
        return NextResponse.json(
          { error: "Invalid credits value in metadata" },
          { status: 400 }
        );
      }

      try {
        // Mark transaction as completed (if you create it at checkout creation)
        const tx = await prisma.transaction.updateMany({
          where: { dodoPaymentId: payment.id },
          data: { status: "completed" },
        });

        console.log("🧾 Transaction update result:", {
          matched: tx.count,
          dodoPaymentId: payment.id,
        });

        // Increment user credits
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            credits: {
              increment: credits,
            },
          },
        });

        console.log(`✅ Added ${credits} credits to user ${userId}`);
        console.log(`💰 New credit balance: ${updatedUser.credits}`);

        return NextResponse.json({
          received: true,
          creditsAdded: credits,
          newBalance: updatedUser.credits,
        });
      } catch (error: any) {
        console.error("❌ Database error while updating credits:", error);
        return NextResponse.json(
          { error: "Failed to update credits" },
          { status: 500 }
        );
      }
    }

    // 5) Handle failed payments
    if (eventType === "payment.failed") {
      if (payment?.id) {
        console.log("❌ Payment failed:", payment.id);
        await prisma.transaction.updateMany({
          where: { dodoPaymentId: payment.id },
          data: { status: "failed" },
        });
      }
    }

    // 6) Default ack
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Webhook handler error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
