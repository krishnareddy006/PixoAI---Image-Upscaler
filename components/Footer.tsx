export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-5">
          <div className="text-center">
            <p className="text-gray-900 dark:text-gray-400 text-sm mb-2">
              Enhance resolution, restore details, and achieve professional-quality results in seconds.
            </p>
            <p className="text-gray-900 dark:text-gray-400 text-xs">
              © {currentYear} PixoAI. All rights reserved.
            </p>
          </div>
    </footer>
  );
}