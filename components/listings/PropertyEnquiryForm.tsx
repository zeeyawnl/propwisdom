"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  /** Category key from LEAD_CATEGORY_MAP — determines PropertyFor/Property server-side. */
  category: string;
  /** Shown in the light variant heading: "Can't find the right {categoryLabel}?" */
  categoryLabel?: string;
  /** When set, the payload includes this as the CRM Project field. */
  propertyName?: string;
  /**
   * "light" (default) — full 9-field split-panel form used on listing pages.
   * "dark"            — compact 4-field form styled for the teal sticky card.
   */
  variant?: "light" | "dark";
}

// ─── Field state ──────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  configuration: string;
  message: string;
}

const emptyForm: FormState = {
  name: "", phone: "", email: "", city: "",
  location: "", budgetMin: "", budgetMax: "", configuration: "", message: "",
};

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LightInput({
  id, type = "text", label, placeholder, value, onChange, disabled, error,
}: {
  id: string; type?: string; label: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  disabled?: boolean; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-widest text-slate-400 font-bold transition-colors"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        suppressHydrationWarning
        className={`w-full bg-slate-50/50 border px-4 py-3.5 text-sm text-slate-900 rounded-xl transition-all duration-300 outline-none placeholder:text-slate-400 font-light hover:border-slate-300 focus:bg-white ${error
          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 bg-red-50/20"
          : "border-slate-200 focus:border-teal-forest focus:ring-2 focus:ring-teal-forest/10"
          }`}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-light">{error}</p>}
    </div>
  );
}

function DarkInput({
  id, type = "text", label, placeholder, value, onChange, disabled, error, textarea,
}: {
  id: string; type?: string; label: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  disabled?: boolean; error?: string; textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-[10px] uppercase tracking-widest font-bold text-white/40">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-white/5 border px-4 py-3 text-sm text-white rounded-xl transition-all duration-300 outline-none placeholder:text-white/30 font-light resize-none hover:border-white/20 ${error
            ? "border-red-400/50 focus:border-red-400 focus:bg-white/10 focus:ring-2 focus:ring-red-400/20 bg-red-500/5"
            : "border-white/10 focus:border-vanilla-latte focus:bg-white/10 focus:ring-2 focus:ring-vanilla-latte/10"
            }`}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          suppressHydrationWarning
          className={`w-full bg-white/5 border px-4 py-3.5 text-sm text-white rounded-xl transition-all duration-300 outline-none placeholder:text-white/30 font-light hover:border-white/20 ${error
            ? "border-red-400/50 focus:border-red-400 focus:bg-white/10 focus:ring-2 focus:ring-red-400/20 bg-red-500/5"
            : "border-white/10 focus:border-vanilla-latte focus:bg-white/10 focus:ring-2 focus:ring-vanilla-latte/10"
            }`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-300 font-light">{error}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PropertyEnquiryForm({
  category,
  categoryLabel = "property",
  propertyName,
  variant = "light",
}: Props) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function setField(field: keyof FormState) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (form.name.trim().length < 2)
      errs.name = "Please enter your full name (at least 2 characters).";
    if (!/^\d{10}$/.test(form.phone.replace(/\s+/g, "")))
      errs.phone = "Please enter a valid 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          category,
          city: form.city,
          location: form.location,
          budgetMin: form.budgetMin,
          budgetMax: form.budgetMax,
          configuration: form.configuration,
          propertyName: propertyName ?? "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage(
          data.message ?? "Thank you! Our team will reach out with the best options for you."
        );
        setForm(emptyForm);
      } else {
        setStatus("error");
        setStatusMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Unable to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Dark variant ──────────────────────────────────────────────────────────
  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <DarkInput id="peq-name" label="Full Name" placeholder="Your full name" value={form.name} onChange={setField("name")} disabled={isSubmitting} error={fieldErrors.name} />
        <DarkInput id="peq-phone" label="Phone Number" placeholder="10-digit number" value={form.phone} onChange={setField("phone")} disabled={isSubmitting} error={fieldErrors.phone} type="tel" />
        <DarkInput id="peq-email" label="Email Address" placeholder="Your email address" value={form.email} onChange={setField("email")} disabled={isSubmitting} error={fieldErrors.email} type="email" />
        <DarkInput id="peq-message" label="Message" placeholder={propertyName ? `I'm interested in ${propertyName}` : "Your message..."} value={form.message} onChange={setField("message")} disabled={isSubmitting} textarea />

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="p-3 bg-white/10 border border-white/20 text-white text-xs font-light rounded-2xl">
              {statusMessage}
            </motion.div>
          )}
          {status === "error" && (
            <motion.div key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="p-3 bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-light rounded-2xl">
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          suppressHydrationWarning
          className="flex items-center justify-center gap-3 w-full py-4 bg-vanilla-latte text-teal-forest uppercase tracking-[0.2em] text-[11px] font-bold rounded-full hover:bg-white transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? <><Loader2 size={14} className="animate-spin" /> Sending...</>
            : <><Send size={14} /> Send Enquiry</>}
        </button>
      </form>
    );
  }

  // ─── Light variant (default) ───────────────────────────────────────────────
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mt-6 mb-12">
      <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row">

          {/* Left: Headline */}
          <div className="lg:w-[380px] shrink-0 bg-teal-forest p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
            {/* Soft decorative background glow shapes */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-32 w-64 h-64 rounded-full bg-vanilla-latte/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 left-1/3 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-[1.25] tracking-tight">
                Can&apos;t find the <br />
                perfect <span className="font-serif italic text-vanilla-latte text-4xl sm:text-5xl mt-2 block">{categoryLabel}?</span>
              </h2>

              <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed mt-6 max-w-xs">
                Share your requirements and we will curate a bespoke shortlist from our off-market inventory.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 p-6 sm:p-10 lg:p-14 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 lg:space-y-10">

              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                <LightInput id="leq-name" label="Full Name" placeholder="Your full name" value={form.name} onChange={setField("name")} disabled={isSubmitting} error={fieldErrors.name} />
                <LightInput id="leq-phone" label="Phone Number" placeholder="10-digit number" value={form.phone} onChange={setField("phone")} disabled={isSubmitting} error={fieldErrors.phone} type="tel" />
              </div>

              {/* Row 2: Email */}
              <LightInput id="leq-email" label="Email Address" placeholder="Your email address" value={form.email} onChange={setField("email")} disabled={isSubmitting} error={fieldErrors.email} type="email" />

              {/* Row 3: City + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                <LightInput id="leq-city" label="Preferred City" placeholder="Preferred city" value={form.city} onChange={setField("city")} disabled={isSubmitting} />
                <LightInput id="leq-location" label="Preferred Location" placeholder="Preferred location" value={form.location} onChange={setField("location")} disabled={isSubmitting} />
              </div>

              {/* Row 4: Budget Min + Budget Max */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                <LightInput id="leq-budget-min" label="Budget Min" placeholder="E.g., 50 Lakhs" value={form.budgetMin} onChange={setField("budgetMin")} disabled={isSubmitting} />
                <LightInput id="leq-budget-max" label="Budget Max" placeholder="E.g., 1 Crore" value={form.budgetMax} onChange={setField("budgetMax")} disabled={isSubmitting} />
              </div>

              {/* Row 5: Configuration */}
              <LightInput id="leq-config" label="Configuration" placeholder="E.g., 2 BHK, Office Space" value={form.configuration} onChange={setField("configuration")} disabled={isSubmitting} />

              {/* Row 6: Message */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="leq-message" className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Additional Requirements
                </label>
                <textarea
                  id="leq-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setField("message")(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="E.g., Preferred facing, floor preference, possession timeline..."
                  className="w-full bg-slate-50/50 border border-slate-200 px-4 py-3.5 text-sm text-slate-900 rounded-xl transition-all duration-300 outline-none placeholder:text-slate-400 font-light resize-none hover:border-slate-300 focus:bg-white focus:border-teal-forest focus:ring-2 focus:ring-teal-forest/10"
                />
              </div>

              {/* Status */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-4 bg-teal-50 border border-teal-200 text-teal-800 text-sm font-light rounded-2xl">
                    {statusMessage}
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-light rounded-2xl">
                    {statusMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="group flex items-center justify-center gap-4 w-full sm:w-auto px-8 py-4 bg-teal-forest text-vanilla-latte uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-teal-forest/90 transition-all rounded-full active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-teal-forest/10"
                >
                  {isSubmitting
                    ? <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                    : <><Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Enquiry</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
