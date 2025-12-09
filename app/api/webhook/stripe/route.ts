import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// Explicitly type Stripe with the version your SDK supports
type StripeApiVersion = "2025-02-24.acacia";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia" as StripeApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("❌ No Stripe signature found");
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log("✅ Webhook event received:", event.type);

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("💳 Checkout session completed:", {
        sessionId: session.id,
        metadata: session.metadata,
      });

      const { userId, credits } = session.metadata || {};

      if (!userId || !credits) {
        console.error("❌ Missing metadata:", { userId, credits });
        return NextResponse.json(
          { error: "Missing userId or credits in metadata" },
          { status: 400 }
        );
      }

      try {
        // Update user credits
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            credits: {
              increment: parseInt(credits),
            },
          },
        });

        console.log(
          `✅ Successfully added ${credits} credits to user ${userId}`
        );
        console.log(`💰 New credit balance: ${updatedUser.credits}`);

        return NextResponse.json({
          received: true,
          creditsAdded: parseInt(credits),
          newBalance: updatedUser.credits,
        });
      } catch (error: any) {
        console.error("❌ Database error:", error);
        return NextResponse.json(
          { error: "Failed to update credits in database" },
          { status: 500 }
        );
      }
    }

    // Return success for other event types
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Webhook handler error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
