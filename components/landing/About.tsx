export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Image */}
        <div className="flex-1 w-full mx-auto relative hidden lg:block">
          <div className="absolute inset-0 bg-indigo-100 rounded-[3rem] transform -rotate-3 blur-[2px]" />
          {/* Replace with your own team / office image in /public */}
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
            alt="Real estate agents at work"
            className="relative z-10 rounded-[3rem] border-8 border-white shadow-xl h-[500px] w-full object-cover"
          />
        </div>

        {/* Right — Copy */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Trusted Advisors in Real Estate
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            We don&apos;t just sell properties; we find properties that match
            your lifestyle and dreams. With over a decade of market presence, we
            bring clarity and security to real estate transactions.
          </p>

          <ul className="space-y-6 pt-4">
            <li className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Expert Market Knowledge</h3>
                <p className="text-slate-600 font-medium">
                  Our agents live and breathe the local market data &amp; trends.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">100% Genuine Listings</h3>
                <p className="text-slate-600 font-medium">
                  Every property is physically verified by our team.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Dedicated Support</h3>
                <p className="text-slate-600 font-medium">
                  Personal guidance from property search to final handover.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
