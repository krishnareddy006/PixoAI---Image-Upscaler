// // "use client";

// // const badges = [
// //   {
// //     icon: (
// //       <svg className="w-10 h-10 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //       </svg>
// //     ),
// //     title: "Secure Payments",
// //     description: "Industry-standard encryption for all transactions",
// //   },
// //   {
// //     icon: (
// //       <svg className="w-10 h-10 text-yellow-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     title: "7-Day Money-Back",
// //     description: "Satisfaction guaranteed or your money back",
// //   },
// //   {
// //     icon: (
// //       <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //       </svg>
// //     ),
// //     title: "Upgrade Anytime",
// //     description: "Change your plan whenever you need",
// //   },
// // ];

// // export function TrustBadges() {
// //   return (
// //     <section className="py-12 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {badges.map((badge, index) => (
// //             <div
// //               key={index}
// //               className="p-6 rounded-xl border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 transition-all text-center"
// //             >
// //               <div className="mb-3">{badge.icon}</div>
// //               <h3 className="text-lg font-semibold text-white mb-2">
// //                 {badge.title}
// //               </h3>
// //               <p className="text-gray-400 text-sm">{badge.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// const badges = [
//   {
//     icon: (
//       <svg className="w-10 h-10 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//       </svg>
//     ),
//     title: "Secure Payments",
//     description: "Industry-standard encryption for all transactions. Your payment information is protected with PCI-DSS Level 1 compliance through Stripe.",
//   },
//   {
//     icon: (
//       <svg className="w-10 h-10 text-yellow-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     title: "7-Day Money-Back",
//     description: "Satisfaction guaranteed or your money back. If you're not completely happy with your purchase, we'll issue a full refund within 7 days.",
//   },
//   {
//     icon: (
//       <svg className="w-10 h-10 text-cyan-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//       </svg>
//     ),
//     title: "Upgrade Anytime",
//     description: "Change your plan whenever you need. Purchase additional credits at any time without any restrictions or limitations.",
//   },
// ];

// export function TrustBadges() {
//   return (
//     <section className="py-12 px-4 bg-slate-50 dark:bg-slate-900">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {badges.map((badge, index) => (
//             <div
//               key={index}
//               className="p-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-center"
//             >
//               <div className="mb-4">{badge.icon}</div>
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
//                 {badge.title}
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
//                 {badge.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


export function TrustBadges() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-medium">Secure Payment</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-500"
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
            <span className="font-medium">Instant Activation</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span className="font-medium">Cancel Anytime</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Credits Never Expire</span>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {/* Stripe Badge */}
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-slate-600 dark:text-slate-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Powered by Stripe
              </span>
            </div>

            {/* SSL Badge */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                SSL Secured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
