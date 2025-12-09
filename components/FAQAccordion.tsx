"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What image formats are supported?",
    answer:
      "We support PNG, JPG, JPEG, and WebP formats. Maximum file size is 10MB.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "1 upscaling costs 1 credit. 2 credits for reimagination AI. No credits required for business plan.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes! We offer a 7-day money-back guarantee. If you're not satisfied, contact our support team.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All images are processed securely and deleted after 24 hours. We never store your images permanently.",
  },
  {
    question: "What's the difference between 2x and 4x upscaling?",
    answer:
      "2x doubles the resolution, while 4x quadruples it. Both use advanced AI to maintain quality.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Find answers to common questions about our AI image upscaler
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
              >
                <h3 className="text-m font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-5 pt-2">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
