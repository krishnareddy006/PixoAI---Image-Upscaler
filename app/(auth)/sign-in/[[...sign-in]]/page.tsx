import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
            card: "bg-white dark:bg-slate-800 shadow-xl",
            headerTitle: "text-slate-900 dark:text-white",
            headerSubtitle: "text-slate-600 dark:text-slate-400",
            socialButtonsBlockButton: 
              "bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600",
            socialButtonsBlockButtonText: "text-slate-900 dark:text-white font-semibold",
            formFieldLabel: "text-slate-700 dark:text-slate-300",
            formFieldInput: 
              "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white",
            footerActionLink: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700",
            identityPreviewText: "text-slate-900 dark:text-white",
            formFieldInputShowPasswordButton: "text-slate-600 dark:text-slate-400",
          },
        }}
      />
    </div>
  );
}
