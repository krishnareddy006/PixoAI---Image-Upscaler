// "use client";

// import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { ThemeToggle } from "./ThemeToggle";

// export function Navbar() {
//   const [credits, setCredits] = useState<number>(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCredits();
//     const interval = setInterval(fetchCredits, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchCredits = async () => {
//     try {
//       const res = await fetch("/api/user/credits");
//       if (res.ok) {
//         const data = await res.json();
//         setCredits(data.credits);
//       }
//     } catch (error) {
//       console.error("Error fetching credits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left: Logo & Name */}
//           <Link href="/" className="flex items-center gap-3 flex-shrink-0">
//             <div className="w-30 h-20 flex items-center justify-center ">
//               <Image
//                 src="/pixoAI.png"
//                 alt="PixoAI Logo"
//                 width={125}
//                 height={200}
//               />
//             </div>
//             {/* <span className="text-slate-900 dark:text-white font-bold text-xl hidden sm:inline">
//               PixoAI
//             </span> */}
//           </Link>

//           {/* Center: Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link
//               href="/"
//               className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               href="/pricing"
//               className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
//             >
//               Pricing
//             </Link>
//           </div>

//           {/* Right: Credits, Theme, Account */}
//           <div className="flex items-center gap-4">
//             {/* Credits Display */}
//             <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl ">
//               <span className="text-indigo-700 dark:text-indigo-300 text-xs font-medium">Credits</span>
//               <span className="text-slate-900 dark:text-white font-bold text-sm">
//                 {loading ? "..." : credits}
//               </span>
//             </div>

//             {/* Theme Toggle */}
//             <ThemeToggle />

//             {/* Clerk User Button */}
//             <UserButton afterSignOutUrl="/sign-in" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchCredits();
    const interval = setInterval(fetchCredits, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/user/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative w-12 h-8">
              <Image
                src="/pixoAI.png"
                alt="PixoAI Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-bold text-xl hidden sm:inline">
              PixoAI
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Right: Credits, Theme, User, Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Credits Display */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                Credits
              </span>
              <span className="text-gray-900 dark:text-white font-bold text-sm">
                {loading ? "..." : credits}
              </span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Button - Hidden on mobile */}
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="px-2 py-2 sm:hidden">
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

