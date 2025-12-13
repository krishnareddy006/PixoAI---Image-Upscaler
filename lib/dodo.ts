// lib/dodo.ts
import DodoPayments from "dodopayments";

if (!process.env.DODO_PAYMENTS_API_KEY) {
  throw new Error("DODO_PAYMENTS_API_KEY is not defined");
}

const environment = (process.env.DODO_PAYMENTS_MODE || "test_mode") as
  | "test_mode"
  | "live_mode";

export const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment,
});

export interface CreatePaymentLinkRequest {
  productId: string;
  credits: number;
  userId: string;
  email: string;
}

export interface CreatePaymentLinkResponse {
  paymentLink: string;
  paymentId: string;
}

/**
 * Create a Dodo Payments checkout session
 * Based on official documentation example
 */
export async function createPaymentLink(
  req: CreatePaymentLinkRequest
): Promise<CreatePaymentLinkResponse> {
  try {
    console.log("💳 Creating Dodo checkout session:", {
      productId: req.productId,
      userId: req.userId,
    });

    // EXACT format from Dodo docs - Example 1
    const session = await dodoClient.checkoutSessions.create({
      product_cart: [
        {
          product_id: req.productId,
          quantity: 1,
        },
      ],
      customer: {
        email: "guest@pixoai.com",
        name: "Guest User",
      },
      billing_address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        country: "US",
        zipcode: "94102",
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
      metadata: {
        userId: req.userId,
        credits: req.credits.toString(),
      },
    });

    console.log("✅ Checkout session created:", {
      sessionId: session.session_id,
      hasCheckoutUrl: !!session.checkout_url,
    });

    if (!session.checkout_url) {
      throw new Error("No checkout URL returned from Dodo");
    }

    return {
      paymentLink: session.checkout_url,
      paymentId: session.session_id,
    };
  } catch (error: any) {
    console.error("❌ Dodo checkout session error:", {
      message: error.message,
      status: error.status,
    });
    
    throw new Error(
      `Failed to create checkout session: ${error.message || "Unknown error"}`
    );
  }
}

export const DODO_PRICING_PLANS = {
  starter: {
    name: "Starter Pack",
    credits: 50,
    price: 9.0,
    productId: process.env.NEXT_PUBLIC_DODO_STARTER_PRODUCT_ID!,
  },
  pro: {
    name: "Pro Pack",
    credits: 120,
    price: 24.0,
    productId: process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID!,
    popular: true,
  },
  enterprise: {
    name: "Enterprise Pack",
    credits: 350,
    price: 49.0,
    productId: process.env.NEXT_PUBLIC_DODO_ENTERPRISE_PRODUCT_ID!,
  },
};
