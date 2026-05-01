"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-slate-100"
        >
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
            Legal / Terms
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-12">
            Terms of Service
          </h1>

          <div className="space-y-10 text-slate-600 font-light leading-relaxed">
            <p>
              Welcome to PropWisdom. These Terms of Service govern your use of our website, real estate consulting, mandate services, and property listings. By accessing our platform or utilizing our services, you agree to be bound by these terms.
            </p>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">1. Real Estate Services</h2>
              <p>
                PropWisdom operates as a real estate advisory and mandate firm based in Pune, Maharashtra. We facilitate the buying, selling, renting, and development of properties. The property listings, details, and prices provided on our platform are subject to change without prior notice, based on market dynamics and builder/owner discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">2. Accuracy of Information</h2>
              <p>
                While we strive to ensure that all property details, specifications, floor plans, and pricing information displayed are accurate and up-to-date, they are provided for general informational purposes only. We strongly advise clients to independently verify all property documents, approvals, and physical conditions before making any financial commitment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">3. Mandate Property Agreements</h2>
              <p>
                For clients engaging our Mandate Property Services (end-to-end development), specific contractual agreements will be drafted and signed separately. These Terms of Service apply to the general use of the website and initial consultations. The separate mandate contract will govern timelines, financial structures, and legal obligations for development projects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">4. Intellectual Property</h2>
              <p>
                All content, logos, property images curated by our team, and website design elements are the intellectual property of PropWisdom. Unauthorized reproduction, scraping of our property database, or distribution of our proprietary content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">5. Limitation of Liability</h2>
              <p>
                PropWisdom shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, or from any decisions made based on the information provided on our platform. Real estate investments are subject to market risks.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
