import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});


export const PRICING_PLANS = {
  starter: {
    name: "Starter Pack",
    credits: 50,
    price: 500, 
    description: "Perfect for getting started",
  },
  professional: {
    name: "Professional Pack",
    credits: 100,
    price: 800,
    description: "Most popular choice",
    popular: true,
  },
  business: {
    name: "Business Pack",
    credits: 150,
    price: 1200,
    description: "For heavy users",
  },
};

