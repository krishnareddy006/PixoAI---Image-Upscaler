// "use client";

// import { useState } from "react";
// import { toast } from "react-hot-toast";

// interface PricingCardProps {
//   title: string;
//   price: string;
//   credits: number;
//   features: string[];
//   priceId: string;
//   isPopular?: boolean;
// }

// export function PricingCard({
//   title,
//   price,
//   credits,
//   features,
//   priceId,
//   isPopular = false,
// }: PricingCardProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handlePurchase = async () => {
//     try {
//       setIsLoading(true);

//       const response = await fetch("/api/stripe/create-checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           priceId,
//           credits,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to create checkout session");
//       }

//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         throw new Error("No checkout URL returned");
//       }
//     } catch (error: any) {
//       console.error("Purchase error:", error);
//       toast.error(error.message || "Failed to start checkout");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300">
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
//           {title}
//         </h3>
//         <div className="flex items-baseline justify-center gap-1 mb-1">
//           <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
//             {price}
//           </span>
//         </div>
//         <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
//           {credits} Credits
//         </p>
//       </div>

//       <ul className="space-y-3 mb-6">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-start gap-3">
//             <svg
//               className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <span className="text-slate-700 dark:text-slate-300 text-sm">
//               {feature}
//             </span>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={handlePurchase}
//         disabled={isLoading}
//         className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-slate-900 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 fill="none"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Processing...
//           </span>
//         ) : (
//           "Get Credits"
//         )}
//       </button>

//       <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
//         Secure payment via Stripe
//       </p>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface PricingCardProps {
  title: string;
  price: string;
  credits: number;
  productId: string;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({
  title,
  price,
  credits,
  productId,
  features,
  isPopular,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!userId) {
      toast.error("Please sign in first");
      router.push("/sign-in");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/dodo/create-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          credits,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create payment link");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to proceed with checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`rounded-lg border p-8 transition-all`}
    >
      

      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-1">{price}</p>

      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {credits} Credits
        </p>
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-3 text-green-500">✓</span>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
  onClick={handleCheckout}
  disabled={isLoading}
  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all
    bg-gray-200 dark:bg-gray-700
    text-gray-900 dark:text-white
    hover:bg-gray-300 dark:hover:bg-gray-600
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  {isLoading ? "Processing..." : "Get Started"}
</button>

    </div>
  );
}

