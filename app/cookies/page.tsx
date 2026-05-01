"use client";

import { motion } from "framer-motion";

export default function CookiePolicyPage() {
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
            Legal / Cookies
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-12">
            Cookie Policy
          </h1>

          <div className="space-y-10 text-slate-600 font-light leading-relaxed">
            <p>
              This Cookie Policy explains how PropWisdom uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">1. What are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">2. Why do we use Cookies?</h2>
              <p className="mb-3">We use first and third-party cookies for several reasons:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Some cookies are required for technical reasons in order for our website to operate securely.</li>
                <li><strong>Performance and Analytics:</strong> These cookies help us understand how visitors interact with our property listings, allowing us to improve the user experience and feature the most relevant properties.</li>
                <li><strong>Preferences:</strong> We use these cookies to remember your property search preferences (e.g., location, budget, or property type filters) so you don't have to re-enter them on subsequent visits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">3. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies (such as Google Analytics) to report usage statistics of the service, deliver advertisements on and through the service, and so on. These third-party services are outside of our control and operate under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4 font-medium">4. How can I control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
