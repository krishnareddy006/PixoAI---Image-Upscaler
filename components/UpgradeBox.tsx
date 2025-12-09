// // "use client";

// // import Link from "next/link";

// // export function UpgradeBox() {
// //   return (
// //     <div className="w-full p-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-red-500/5 text-center">
// //       <svg
// //         className="w-12 h-12 text-orange-400 mx-auto mb-4"
// //         fill="none"
// //         stroke="currentColor"
// //         viewBox="0 0 24 24"
// //       >
// //         <path
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           strokeWidth={2}
// //           d="M12 8v13m0-13V6m0 0L7 11m5-5l5 5"
// //         />
// //       </svg>
// //       <h3 className="text-xl font-bold text-white mb-2">
// //         No Credits Left!
// //       </h3>
// //       <p className="text-gray-400 mb-6">
// //         Upgrade your plan to continue enhancing your images. Get more credits and
// //         enjoy unlimited upscaling.
// //       </p>
// //       <Link
// //         href="/pricing"
// //         className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all"
// //       >
// //         Upgrade Now
// //       </Link>
// //     </div>
// //   );
// // }



// "use client";

// import Link from "next/link";

// export function UpgradeBox() {
//   return (
//     <div className="w-full p-8 rounded-2xl border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 text-center">
//       <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
//         <svg
//           className="w-8 h-8 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           />
//         </svg>
//       </div>
//       <h3 className="text-2xl font-bold text-white mb-2">
//         No Credits Left!
//       </h3>
//       <p className="text-slate-400 mb-6">
//         Upgrade your plan to continue enhancing your images. Get more credits and
//         enjoy unlimited upscaling.
//       </p>
//       <Link
//         href="/pricing"
//         className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30"
//       >
//         Upgrade Now
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";

export function UpgradeBox() {
  return (
    <div className="w-full p-8 rounded-2xl border-2 border-orange-400/30 dark:border-orange-500/30 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        No Credits Left!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Upgrade your plan to continue enhancing your images. Get more credits and
        enjoy unlimited upscaling.
      </p>
      <Link
        href="/pricing"
        className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl shadow-orange-500/30"
      >
        Upgrade Now
      </Link>
    </div>
  );
}
