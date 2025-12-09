// "use client";

// import { useState, useRef, useEffect } from "react";

// interface ImageComparisonProps {
//   originalImage: string;
//   upscaledImage: string;
//   scaleFactor: 2 | 4;
//   onScaleChange: (scale: 2 | 4) => void;
//   isProcessing: boolean;
// }

// export function ImageComparison({
//   originalImage,
//   upscaledImage,
//   scaleFactor,
//   onScaleChange,
//   isProcessing,
// }: ImageComparisonProps) {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Get the natural dimensions when image loads
//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => {
//       // Calculate display dimensions (max 800px width, maintain aspect ratio)
//       const maxWidth = 800;
//       const aspectRatio = img.height / img.width;
//       const displayWidth = Math.min(img.width, maxWidth);
//       const displayHeight = displayWidth * aspectRatio;
      
//       setImageDimensions({
//         width: displayWidth,
//         height: Math.min(displayHeight, 500), // Max 500px height
//       });
//     };
//     img.src = originalImage;
//   }, [originalImage]);

//   const handleMove = (clientX: number) => {
//     if (!containerRef.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const percentage = (x / rect.width) * 100;
//     setSliderPosition(Math.max(0, Math.min(100, percentage)));
//   };

//   const handleMouseDown = () => setIsDragging(true);
//   const handleMouseUp = () => setIsDragging(false);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     handleMove(e.clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (e.touches.length > 0) {
//       handleMove(e.touches[0].clientX);
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = upscaledImage;
//     link.download = `upscaled-${scaleFactor}x.png`;
//     link.click();
//   };

//   if (imageDimensions.width === 0) {
//     return (
//       <div className="flex items-center justify-center p-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Scale Factor Selector */}
//       <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
//         <div className="flex items-center gap-2">
//           <svg
//             className="w-5 h-5 text-slate-600 dark:text-slate-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
//             />
//           </svg>
//           <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//             Upscale Factor:
//           </span>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => onScaleChange(2)}
//             disabled={isProcessing}
//             className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//               scaleFactor === 2
//                 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
//                 : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             2x
//           </button>
//           <button
//             onClick={() => onScaleChange(4)}
//             disabled={isProcessing}
//             className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//               scaleFactor === 4
//                 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
//                 : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             4x
//           </button>
//         </div>
//       </div>

//       {/* Image Comparison Container */}
//       <div className="flex justify-center">
//         <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
//           <div
//             ref={containerRef}
//             className="relative select-none cursor-ew-resize"
//             style={{
//               width: `${imageDimensions.width}px`,
//               height: `${imageDimensions.height}px`,
//             }}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseUp}
//             onTouchStart={() => setIsDragging(true)}
//             onTouchEnd={() => setIsDragging(false)}
//             onTouchMove={handleTouchMove}
//           >
//             {/* Base Image: Upscaled (Full Width - Always Visible) */}
//             <img
//               src={upscaledImage}
//               alt="Upscaled"
//               style={{
//                 display: "block",
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "fill",
//               }}
//               draggable={false}
//             />

//             {/* Overlay: Original Image with Clip Path (STAYS IN PLACE) */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
//               }}
//             >
//               <img
//                 src={originalImage}
//                 alt="Original"
//                 style={{
//                   display: "block",
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "fill",
//                 }}
//                 draggable={false}
//               />
//             </div>

//             {/* Slider Line */}
//             <div
//               className="absolute top-0 h-full w-1 bg-white shadow-2xl cursor-ew-resize z-10"
//               style={{ left: `${sliderPosition}%` }}
//             >
//               {/* Slider Handle */}
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <div className="w-12 h-12 bg-white rounded-full shadow-2xl border-4 border-indigo-500 flex items-center justify-center hover:scale-110 transition-transform">
//                   <div className="flex gap-1">
//                     <svg
//                       className="w-3 h-3 text-slate-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={3}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                     <svg
//                       className="w-3 h-3 text-slate-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={3}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Labels */}
//             <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg pointer-events-none z-20">
//               Original
//             </div>
//             <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg pointer-events-none z-20">
//               Upscaled {scaleFactor}x
//             </div>

//             {/* Instructions */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg pointer-events-none z-20">
//               ← Drag slider to compare →
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Download Button */}
//       <button
//         onClick={handleDownload}
//         className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//           />
//         </svg>
//         Download Upscaled Image ({scaleFactor}x)
//       </button>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";

interface ImageComparisonProps {
  originalImage: string;
  upscaledImage: string;
  scaleFactor: 2 | 4;
  onScaleChange: (scale: 2 | 4) => void;
  isProcessing: boolean;
}

export function ImageComparison({
  originalImage,
  upscaledImage,
  scaleFactor,
  onScaleChange,
  isProcessing,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the natural dimensions when image loads
  useEffect(() => {
    const calculateDimensions = () => {
      const img = new Image();
      img.onload = () => {
        // Get screen width
        const screenWidth = window.innerWidth;
        
        // Calculate max width based on screen size
        const maxWidth = screenWidth < 640 
          ? screenWidth - 32  // Mobile: screen width minus padding
          : screenWidth < 1024 
          ? 600  // Tablet
          : 800; // Desktop
        
        const aspectRatio = img.height / img.width;
        const displayWidth = Math.min(img.width, maxWidth);
        const displayHeight = displayWidth * aspectRatio;
        
        // Max height based on screen size
        const maxHeight = screenWidth < 640 ? 400 : 500;
        
        setImageDimensions({
          width: displayWidth,
          height: Math.min(displayHeight, maxHeight),
        });
      };
      img.src = originalImage;
    };

    calculateDimensions();

    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [originalImage]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = upscaledImage;
    link.download = `upscaled-${scaleFactor}x.png`;
    link.click();
  };

  if (imageDimensions.width === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Scale Factor Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
          <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Upscale Factor:
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => onScaleChange(2)}
            disabled={isProcessing}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
              scaleFactor === 2
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            2x
          </button>
          <button
            onClick={() => onScaleChange(4)}
            disabled={isProcessing}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
              scaleFactor === 4
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            4x
          </button>
        </div>
      </div>

      {/* Image Comparison Container */}
      <div className="flex justify-center px-4 sm:px-0">
        <div className="relative overflow-hidden w-full max-w-full">
          <div
            ref={containerRef}
            className="relative select-none cursor-ew-resize"
            style={{
              width: `${imageDimensions.width}px`,
              height: `${imageDimensions.height}px`,
              maxWidth: '100%',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* Base Image: Upscaled (Full Width - Always Visible) */}
            <img
              src={upscaledImage}
              alt="Upscaled"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
              draggable={false}
            />

            {/* Overlay: Original Image with Clip Path (STAYS IN PLACE) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={originalImage}
                alt="Original"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
                draggable={false}
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 h-full w-0.5 sm:w-1 bg-white shadow-2xl cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-2xl border-2 sm:border-4 border-indigo-500 flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
                  <div className="flex gap-0.5 sm:gap-1">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-lg pointer-events-none z-20">
              Original
            </div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-indigo-600/90 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-lg pointer-events-none z-20">
              Upscaled {scaleFactor}x
            </div>

            {/* Instructions */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium shadow-lg pointer-events-none z-20 whitespace-nowrap">
              ← Drag slider to compare →
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="hidden sm:inline">Download Upscaled Image ({scaleFactor}x)</span>
        <span className="sm:hidden">Download ({scaleFactor}x)</span>
      </button>
    </div>
  );
}
