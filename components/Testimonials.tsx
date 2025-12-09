// "use client";

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Professional Photographer",
//     avatar: "SJ",
//     text: "PixoAI transformed my workflow. The quality of upscaled images is incredible.",
//     rating: 5,
//   },
//   {
//     name: "Michael Chen",
//     role: "Content Creator",
//     avatar: "MC",
//     text: "Fast, reliable, and produces amazing results. Definitely worth trying!",
//     rating: 5,
//   },
//   {
//     name: "Emma Williams",
//     role: "Graphic Designer",
//     avatar: "EW",
//     text: "The 4x upscaling is perfect for my designs. No visible artifacts or quality loss.",
//     rating: 5,
//   },
//   {
//     name: "David Martinez",
//     role: "Digital Marketer",
//     avatar: "DM",
//     text: "Great tool for enhancing product images. The AI does a fantastic job.",
//     rating: 5,
//   },
// ];

// export function Testimonials() {
//   return (
//     <section className="py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             What Our Users Say
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Join thousands of satisfied users who trust PixoAI
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="p-6 rounded-xl border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 transition-all"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
//                   {testimonial.avatar}
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold text-sm">
//                     {testimonial.name}
//                   </p>
//                   <p className="text-gray-400 text-xs">{testimonial.role}</p>
//                 </div>
//               </div>
//               <div className="flex gap-1 mb-3">
//                 {Array(testimonial.rating)
//                   .fill(0)
//                   .map((_, i) => (
//                     <svg
//                       key={i}
//                       className="w-4 h-4 text-yellow-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//               </div>
//               <p className="text-gray-300 text-sm">{testimonial.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Photographer",
    avatar: "SJ",
    text: "PixoAI transformed my workflow. The quality of upscaled images is incredible.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Content Creator",
    avatar: "MC",
    text: "Fast, reliable, and produces amazing results. Definitely worth trying!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Graphic Designer",
    avatar: "EW",
    text: "The 4x upscaling is perfect for my designs. No visible artifacts or quality loss.",
    rating: 5,
  },
  {
    name: "David Martinez",
    role: "Digital Marketer",
    avatar: "DM",
    text: "Great tool for enhancing product images. The AI does a fantastic job.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust PixoAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
