'use client'

import { GENERAL_FAQ } from '@/lib/faq-data'
import { Question } from '@/lib/icons'

// Source unique des Q/R : lib/faq-data.tsx (partagée avec le JSON-LD FAQPage).
const faqData = GENERAL_FAQ


export default function WorkingFAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-primary/10 rounded-full mb-4">
          <Question size={32} className="text-red-primary" aria-hidden="true" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
          FAQ
        </h2>
        <p className="text-xl text-gray-600">
          Réponses aux questions fréquemment posées par nos clients
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details 
            key={index}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md open:shadow-lg"
          >
            <summary className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-primary focus:ring-offset-2 list-none">
              <span className="font-semibold text-gray-900 pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                <svg 
                  className="w-5 h-5 text-red-primary" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </summary>
            
            <div className="border-t border-gray-100 bg-gray-50">
              <div className="px-6 py-6 text-gray-600">
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}