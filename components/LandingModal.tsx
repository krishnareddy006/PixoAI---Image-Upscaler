// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// export function LandingModal() {
//   const { isLoaded, isSignedIn } = useUser();
//   const [showModal, setShowModal] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && !isSignedIn) {
//       setShowModal(true);
//     } else if (isLoaded && isSignedIn) {
//       setShowModal(false);
//     }
//   }, [isLoaded, isSignedIn]);

//   if (!showModal || isSignedIn) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Blurred Background */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

//       {/* Modal Card */}
//       <div className="relative z-10 w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
//         {/* Content */}
//         <div className="p-8">
//           <h2 className="text-3xl font-bold text-white text-center mb-2">
//             Welcome to PixoAI
//           </h2>
//           <p className="text-slate-400 text-center text-sm mb-8">
//             AI-powered image upscaling with professional results
//           </p>
          

//           {/* Buttons */}
//           <div className="space-y-3">
//             <Link
//               href="/sign-up"
//               className="block w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all text-center"
//             >
//               Sign Up - Get 10 Free Credits
//             </Link>
//             <Link
//               href="/sign-in"
//               className="block w-full py-3.5 px-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all text-center border border-slate-600"
//             >
//               Sign In to Your Account
//             </Link>
//           </div>

//           {/* Footer Text */}
//           <p className="text-slate-500 text-xs text-center mt-6">
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export function LandingModal() {
  const { isLoaded, isSignedIn } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setShowModal(true);
    } else if (isLoaded && isSignedIn) {
      setShowModal(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!showModal || isSignedIn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">

        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center ">
            <Image
                            src="/pixoAI.png"
                            alt="PixoAI Logo"
                            width="100"
                            height="100"
                            priority
                          />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Welcome to PixoAI
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-8">
            AI-powered image upscaling with professional results
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/sign-up"
              className="block w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all text-center shadow-lg hover:shadow-xl"
            >
              Sign Up - Get 10 Free Credits
            </Link>
            <Link
              href="/sign-in"
              className="block w-full py-3.5 px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all text-center border-2 border-gray-200 dark:border-gray-700"
            >
              Sign In to Your Account
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-gray-500 dark:text-gray-500 text-xs text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
