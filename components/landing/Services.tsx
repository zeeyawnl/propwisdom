const SERVICES = [
  {
    title: "Property Buying",
    desc: "Find the perfect home from our curated premium collection.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Property Selling",
    desc: "Get maximum value and immediate visibility for your property.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Rental Assistance",
    desc: "Hassle-free tenancy management and premium rental listings.",
    icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
  },
  {
    title: "Investment Consulting",
    desc: "High ROI opportunities tailored by market experts.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-900 text-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Our Services</h2>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-16">
          Comprehensive real estate solutions designed for your success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="bg-slate-800 p-10 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition-colors flex flex-col items-center group"
            >
              <div className="bg-slate-700/50 p-4 rounded-2xl mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
