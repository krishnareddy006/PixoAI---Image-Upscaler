"use client";

import { useState } from "react";

interface PaymentFAQItem {
  question: string;
  answer: string;
}

const paymentFaqs: PaymentFAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) through Stripe's secure payment gateway.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Yes, all payments are processed through Stripe, a PCI-DSS Level 1 compliant payment processor. Your card information is never stored on our servers.",
  },
  {
    question: "How do I get a refund?",
    answer:
      "We offer a 7-day money-back guarantee. Contact our support team within 7 days of purchase for a full refund.",
  },
  {
    question: "Do credits expire?",
    answer:
      "Credits do not expire. You can use them anytime, whenever you need to upscale images.",
  },
  {
    question: "Can I purchase more credits later?",
    answer:
      "Yes, you can purchase additional credits anytime. There's no limit to how many credits you can accumulate.",
  },
];

export function PaymentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Payment FAQs
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Common questions about our payment process
          </p>
        </div>

        <div className="space-y-4">
          {paymentFaqs.map((faq, index) => (
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
