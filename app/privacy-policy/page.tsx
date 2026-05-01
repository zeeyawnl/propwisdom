"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Legal / Privacy
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-10 text-slate-600 font-light leading-relaxed">
            <p>
              At PropWisdom, we are committed to protecting the privacy and security of our clients and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our real estate services in Pune and across Maharashtra.
            </p>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">1. Information We Collect</h2>
              <p className="mb-3">We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about our properties or services. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Identity Data:</strong> Name, phone number, email address, and postal address.</li>
                <li><strong>Property Preferences:</strong> Budget, preferred locations, property types (residential, commercial, land), and mandate requirements.</li>
                <li><strong>Financial Information:</strong> Income bracket or loan eligibility status (only if requested for mortgage assistance through our partners).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">2. How We Use Your Information</h2>
              <p className="mb-3">The information we collect is strictly used to facilitate your real estate journey:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To curate and recommend properties that match your specific requirements.</li>
                <li>To contact you via phone or WhatsApp regarding property viewings, negotiations, and mandate updates.</li>
                <li>To facilitate legal and transactional documentation during property purchase or lease.</li>
                <li>To send administrative information regarding changes to our terms or policies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">3. Data Sharing and Disclosure</h2>
              <p>
                PropWisdom does not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. In specific property transactions, your details may be shared with property developers, legal advisors, or financial institutions strictly for the purpose of completing your requested real estate transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">4. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">5. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: <br/>
                <strong className="text-slate-900 mt-2 block">PropWisdom</strong><br/>
                propwisdom@gmail.com<br/>
                +91 89751 23786<br/>
                Pune, Maharashtra 412115
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
