// // import { PricingCard } from "@/components/PricingCard";

// // export default function PricingPage() {
// //   const plans = [
// //     {
// //       title: "Starter",
// //       price: "$9",
// //       credits: 50,
// //       priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
// //       features: [
// //         "50 image upscales",
// //         "2x and 4x upscaling",
// //         "High-quality AI enhancement",
// //         "Standard processing speed",
// //         "Email support",
// //       ],
// //     },
// //     {
// //       title: "Pro",
// //       price: "$19",
// //       credits: 120,
// //       priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
// //       features: [
// //         "120 image upscales",
// //         "2x and 4x upscaling",
// //         "High-quality AI enhancement",
// //         "Priority processing speed",
// //         "Priority email support",
// //       ],
// //     },
// //     {
// //       title: "Enterprise",
// //       price: "$49",
// //       credits: 350,
// //       priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
// //       features: [
// //         "350 image upscales",
// //         "2x and 4x upscaling",
// //         "High-quality AI enhancement",
// //         "Fastest processing speed",
// //         "24/7 priority support",
// //       ],
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen py-16 px-4">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-16">
// //           <h1 className="text-5xl font-bold mb-6">
// //             <span className="gradient-text">Choose Your Plan</span>
// //           </h1>
// //           <p className="text-xl text-slate-600 dark:text-slate-400">
// //             Select the perfect plan for your image upscaling needs
// //           </p>
// //         </div>

// //         {/* Pricing Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
// //           {plans.map((plan) => (
// //             <PricingCard key={plan.title} {...plan} />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { PricingCard } from "@/components/PricingCard";
// import { TrustBadges } from "@/components/TrustBadges";
// import { PaymentFAQ } from "@/components/PaymentFAQ";
// import { toast } from "react-hot-toast";

// const plans = [
//   {
//     title: "Starter",
//     price: "$9",
//     credits: 50,
//     priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
//     features: [
//       "50 image upscales",
//       "2x and 4x upscaling",
//       "High-quality AI enhancement",
//       "Standard processing speed",
//       "Email support",
//     ],
//   },
//   {
//     title: "Pro",
//     price: "$19",
//     credits: 120,
//     priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
//     isPopular: true,
//     features: [
//       "120 image upscales",
//       "2x and 4x upscaling",
//       "High-quality AI enhancement",
//       "Priority processing speed",
//       "Priority email support",
//     ],
//   },
//   {
//     title: "Enterprise",
//     price: "$49",
//     credits: 350,
//     priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
//     features: [
//       "350 image upscales",
//       "2x and 4x upscaling",
//       "High-quality AI enhancement",
//       "Fastest processing speed",
//       "24/7 priority support",
//     ],
//   },
// ];

// function PricingContent() {
//   const searchParams = useSearchParams();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     if (searchParams.get("success")) {
//       setShowSuccessMessage(true);
//       toast.success("Payment successful! Credits added to your account.");
//       setTimeout(() => setShowSuccessMessage(false), 5000);
//     }
//     if (searchParams.get("canceled")) {
//       toast.error("Payment cancelled.");
//     }
//   }, [searchParams]);

//   return (
//     <div className="min-h-screen py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold mb-6">
//             <span className="text-gray-800 dark:text-indigo-400">Choose Your Plan</span>
//           </h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400">
//             Select the perfect plan for your image upscaling needs
//           </p>
//         </div>

//         {/* Success Message */}
//         {showSuccessMessage && (
//           <div className="mx-auto max-w-4xl mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
//             <p className="text-green-400 text-center">
//               ✓ Payment successful! Your credits have been added.
//             </p>
//           </div>
//         )}

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan) => (
//             <PricingCard key={plan.title} {...plan} />
//           ))}
//         </div>

//         {/* Trust Badges */}
//         <TrustBadges />

//         {/* Payment FAQ */}
//         <PaymentFAQ />
//       </div>
//     </div>
//   );
// }

// export default function PricingPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PricingContent />
//     </Suspense>
//   );
// }


"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PricingCard } from "@/components/PricingCard";
import { TrustBadges } from "@/components/TrustBadges";
import { PaymentFAQ } from "@/components/PaymentFAQ";
import { toast } from "react-hot-toast";

const plans = [
  {
    title: "Starter",
    price: "$9",
    credits: 50,
    productId: process.env.NEXT_PUBLIC_DODO_STARTER_PRODUCT_ID!,
    features: [
      "50 image upscales",
      "2x and 4x upscaling",
      "High-quality AI enhancement",
      "Standard processing speed",
      "Email support",
    ],
  },
  {
    title: "Pro",
    price: "$24",  
    credits: 120,
    productId: process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID!,
    isPopular: true,
    features: [
      "120 image upscales",
      "2x and 4x upscaling",
      "High-quality AI enhancement",
      "Priority processing speed",
      "Priority email support",
    ],
  },
  {
    title: "Enterprise",
    price: "$49",
    credits: 350,
    productId: process.env.NEXT_PUBLIC_DODO_ENTERPRISE_PRODUCT_ID!,
    features: [
      "350 image upscales",
      "2x and 4x upscaling",
      "High-quality AI enhancement",
      "Fastest processing speed",
      "24/7 priority support",
    ],
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      setShowSuccessMessage(true);
      toast.success("Payment successful! Credits added to your account.");
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
    if (searchParams.get("canceled")) {
      toast.error("Payment cancelled.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-800 dark:text-indigo-400">Choose Your Plan</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Select the perfect plan for your image upscaling needs
          </p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mx-auto max-w-4xl mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-center">
              ✓ Payment successful! Your credits have been added.
            </p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Payment FAQ */}
        <PaymentFAQ />
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingContent />
    </Suspense>
  );
}
