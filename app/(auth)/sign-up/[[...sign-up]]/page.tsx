// import { SignUp } from "@clerk/nextjs";

// export default function SignUpPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-700">
//       <SignUp 
//         appearance={{
//           elements: {
//             formButtonPrimary: 
//               "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
//             card: "bg-white dark:bg-slate-800 shadow-xl",
//             headerTitle: "text-slate-900 dark:text-white",
//             headerSubtitle: "text-slate-600 dark:text-slate-400",
//             socialButtonsBlockButton: 
//               "bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600",
//             socialButtonsBlockButtonText: "text-slate-900 dark:text-white font-semibold",
//             formFieldLabel: "text-slate-700 dark:text-slate-300",
//             formFieldInput: 
//               "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white",
//             footerActionLink: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700",
//             identityPreviewText: "text-slate-900 dark:text-white",
//             formFieldInputShowPasswordButton: "text-slate-600 dark:text-slate-400",
//           },
//         }}
//       />
//     </div>
//   );
// }


// sign-up/[[...sign-up]]/page.jsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#101010]">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-[#3c3d44] hover:bg-[#2a2b30] text-white",
            card: "bg-white shadow-xl",
            headerTitle: "text-[#1a1a1a] font-semibold",
            headerSubtitle: "text-[#6b7280]",
            socialButtonsBlockButton: 
              "bg-white border border-[#d1d5db] text-[#1a1a1a] hover:bg-[#f9fafb]",
            socialButtonsBlockButtonText: "text-[#1a1a1a] font-medium",
            formFieldLabel: "text-[#374151]",
            formFieldInput: 
              "bg-white border-[#d1d5db] text-[#1a1a1a] focus:border-[#3c3d44]",
            footerActionLink: "text-[#3c3d44] hover:text-[#2a2b30] font-medium",
            identityPreviewText: "text-[#1a1a1a]",
            formFieldInputShowPasswordButton: "text-[#6b7280]",
            dividerText: "text-[#9ca3af]",
            dividerLine: "bg-[#e5e7eb]",
          },
        }}
      />
    </div>
  );
}
