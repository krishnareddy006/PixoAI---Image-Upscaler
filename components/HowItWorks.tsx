// "use client";

// const steps = [
//   {
//     title: "Upload Your Image",
//     description: "Select a PNG, JPG, JPEG, or WebP image (up to 10MB)",
//   },
//   {
//     title: "Choose Scale Factor",
//     description: "Select 2x or 4x upscaling based on your needs",
//   },
//   {
//     title: "AI Enhancement",
//     description: "Our AI processes and upscales your image instantly",
//   },
//   {
//     title: "Download Result",
//     description: "Get your enhanced image in high quality",
//   },
// ];

// export function HowItWorks() {
//   return (
//     <section className="py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             How It Works
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Transform your images in just four simple steps
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="relative p-6 rounded-xl border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 transition-all group text-center"
//             >
//               {/* Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all"></div>

//               <div className="relative">
//                 <div className="flex justify-center mb-3">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
//                         {index + 1}
//                     </div>
//                 </div>

//                 <h3 className="text-lg font-semibold text-white mb-2">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-400 text-sm">{step.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

const steps = [
  {
    title: "Upload Your Image",
    description: "Select a PNG, JPG, JPEG, or WebP image (up to 10MB)",
  },
  {
    title: "Choose Scale Factor",
    description: "Select 2x or 4x upscaling based on your needs",
  },
  {
    title: "AI Enhancement",
    description: "Our AI processes and upscales your image instantly",
  },
  {
    title: "Download Result",
    description: "Get your enhanced image in high quality",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your images in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all group text-center"
            >
              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
