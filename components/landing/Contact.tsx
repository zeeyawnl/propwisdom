export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-indigo-600 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Let&apos;s Discuss Your Needs
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Leave your details below, or connect with us directly on WhatsApp.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900 resize-none"
                placeholder="I am looking for properties in..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-lg border-b-4 border-indigo-800 hover:border-indigo-900"
              >
                Submit Request
              </button>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-lg border-b-4 border-emerald-700 hover:border-emerald-800"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.125-.395-.179-1.29-.481-2.457-1.523-1.077-.962-1.782-2.146-1.929-2.399-.144-.253-.016-.39.11-.516.113-.112.253-.298.379-.447.126-.149.168-.255.253-.424.085-.169.043-.318-.021-.444-.063-.127-.584-1.408-.8-1.925-.213-.505-.429-.437-.584-.444-.143-.008-.309-.008-.474-.008-.168 0-.441.063-.671.314-.23.253-.88.86-.88 2.096 0 1.236.902 2.433 1.026 2.599.125.166 1.776 2.71 4.3 3.8.599.258 1.066.413 1.431.528.601.192 1.15.165 1.58.1.474-.072 1.455-.595 1.66-1.17.205-.575.205-1.068.144-1.17-.061-.103-.227-.165-.48-.291z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
