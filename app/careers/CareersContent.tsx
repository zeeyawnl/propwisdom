"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Check,
  ArrowRight,
  Loader2,
  FileText,
  User,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const OPEN_ROLES: JobRole[] = [
  {
    id: "telecaller",
    title: "Telecaller / Inside Sales Executive",
    department: "Inside Sales",
    location: "Pune (Bhugaon Office)",
    type: "Full-time",
    description: "Engage with potential property buyers, introduce luxury developments, understand their requirements, and coordinate high-value site visits.",
    responsibilities: [
      "Conduct outbound calls to database leads and follow up on inquiries",
      "Explain project details, locations, and pricing configurations eloquently",
      "Filter and nurture warm leads, booking site visits for the field sales team",
      "Maintain precise customer records in the CRM database",
    ],
    requirements: [
      "Excellent verbal communication in English, Hindi, and Marathi",
      "Pleasant phone personality, active listening skills, and confidence",
      "Prior experience in telecalling or customer support (real estate preferred but freshers welcome)",
      "Basic computer proficiency and familiarity with CRM software",
    ],
  },
  {
    id: "sales-executive",
    title: "Real Estate Sales Executive",
    department: "Direct Sales",
    location: "Pune (On-site)",
    type: "Full-time",
    description: "Accompany premium clients on property site visits, explain project USPs, conduct negotiations, and close high-value residential or commercial deals.",
    responsibilities: [
      "Conduct property site visits, presentations, and mock-up walkthroughs",
      "Analyze client investment needs and match them with appropriate listings",
      "Manage client negotiation and coordination through to final agreement signing",
      "Build long-term relationships with clients, builders, and referral channels",
    ],
    requirements: [
      "1-3 years of direct sales experience in Pune real estate",
      "Strong presentation, negotiation, and closing skills",
      "Excellent local area knowledge of emerging residential and commercial corridors in Pune",
      "Must own a personal two/four-wheeler for client site visits",
    ],
  },
  {
    id: "bd-executive",
    title: "Business Development Executive",
    department: "Growth & Strategy",
    location: "Pune (Bhugaon Office)",
    type: "Full-time",
    description: "Identify mandate opportunities, onboard new developers and commercial landlords, map market trends, and secure exclusive real estate portfolios.",
    responsibilities: [
      "Pitch PropWisdom's digital marketing and direct sales solutions to developers",
      "Evaluate properties, conduct feasibility studies, and secure property mandates",
      "Nurture relationships with Tier-1 and Tier-2 developers in Pune",
      "Prepare sales pitches, proposals, and project reports for prospective builder clients",
    ],
    requirements: [
      "Proven business development or relationship manager experience in real estate",
      "Ability to pitch corporate-level services confidently to directors and stakeholders",
      "Analytical mindset to evaluate project profitability and market demand",
      "Self-driven, target-oriented professional",
    ],
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Pune (Bhugaon Office)",
    type: "Full-time",
    description: "Design and implement targeted real estate ad campaigns across Google and Meta, optimize website conversions, and elevate the PropWisdom digital brand.",
    responsibilities: [
      "Launch and optimize paid search, social media, and display ad campaigns",
      "Analyze CPA, CPL, and lead quality metrics, ensuring high ROI on budgets",
      "Collaborate on creating engaging visual and video content for luxury projects",
      "Coordinate email/WhatsApp marketing newsletters and track analytics",
    ],
    requirements: [
      "Experience executing high-performance lead generation campaigns (preferably real estate)",
      "Strong knowledge of Google Ads, Facebook Ads Manager, and Google Analytics",
      "Basic graphic design (Canva/Photoshop) or video editing skills are a strong plus",
      "A data-driven mindset with continuous A/B testing practices",
    ],
  },
  {
    id: "customer-support",
    title: "Customer Relationship Executive",
    department: "CRM & Operations",
    location: "Pune (Bhugaon Office)",
    type: "Full-time",
    description: "Manage client relations post-booking, assist with paperwork, builder-client communications, loan assistance coordinates, and customer dispute resolutions.",
    responsibilities: [
      "Serve as the primary point of contact for clients after property booking",
      "Coordinate draft review and final registration of Agreements to Sale",
      "Assist clients with home loan applications and builder milestone invoices",
      "Ensure prompt resolution of customer inquiries and complaints",
    ],
    requirements: [
      "Excellent interpersonal, written, and verbal communication skills",
      "Detail-oriented mindset to manage complex real estate registration documents",
      "High emotional intelligence to navigate and resolve client anxiety or concerns",
      "Prior experience in customer relationship management (CRM) in real estate",
    ],
  },
];

export default function CareersContent() {
  const formRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    role: string;
    experience: string;
    resumeFile: File | null;
    coverLetter: string;
  }>({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    resumeFile: null,
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, resumeFile: null }));
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus({
        type: "error",
        message: "Only PDF files are allowed.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({
        type: "error",
        message: "File size exceeds the 5MB limit. Please upload a smaller PDF.",
      });
      return;
    }

    if (status.type === "error") {
      setStatus({ type: null, message: "" });
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyClick = (roleTitle: string) => {
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Client-side validations
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.experience ||
      !formData.resumeFile
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields marked with an asterisk (*).",
      });
      setLoading(false);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append("fullName", formData.fullName);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("role", formData.role);
      submissionData.append("experience", formData.experience);
      submissionData.append("coverLetter", formData.coverLetter);
      submissionData.append("resume", formData.resumeFile);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your application has been submitted successfully.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          experience: "",
          resumeFile: null,
          coverLetter: "",
        });
      } else {
        throw new Error(data.error || "Something went wrong while submitting the application.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Unable to submit your application. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto"
        >

          <motion.h1
            variants={cardVariants}
            className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Build a Career with{" "}
            <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">
              PROPWisdom.
            </span>
          </motion.h1>

        </motion.div>
      </section>

      {/* 2. Open Roles Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-28">
        <div className="mb-12 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-light text-slate-900 tracking-tight">
            Current{" "}
            <span className="font-serif italic text-teal-forest">
              Opportunities
            </span>
          </h2>

        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {OPEN_ROLES.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-forest/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-vanilla-latte/30 text-teal-forest text-[10px] uppercase tracking-widest font-bold rounded-full border border-vanilla-latte/40">
                    {job.department}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-light">
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-light">
                    <Clock size={12} /> {job.type}
                  </span>
                </div>

                <h3 className="text-2xl font-medium text-slate-900 mb-4 font-sans leading-tight">
                  {job.title}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-light">
                        <Check size={14} className="text-teal-forest shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2.5">
                    {job.requirements.map((reqStr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-light">
                        <Check size={14} className="text-teal-forest shrink-0 mt-1" />
                        <span>{reqStr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleApplyClick(job.title)}
                className="w-full mt-auto py-4 bg-teal-forest text-vanilla-latte text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/95 hover:translate-y-[-2px] active:translate-y-[0px] transition-all rounded-sm flex items-center justify-center gap-2"
              >
                Apply For This Role <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Application Form Section */}
      <section ref={formRef} className="max-w-[900px] mx-auto px-6 mb-16 scroll-mt-28">
        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-md border border-slate-100 relative overflow-hidden">
          {/* Decorative Corner Background details */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-vanilla-latte/10 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-forest/5 rounded-tr-full pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-3 block">
                Job Application
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight leading-tight">
                Submit Your{" "}
                <span className="font-serif italic text-teal-forest">
                  Application
                </span>
              </h2>
              <p className="text-slate-500 font-light text-sm mt-2">
                Join our Pune team. Complete the form and attach your resume link.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status.type === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 px-6 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-teal-forest/10 rounded-full flex items-center justify-center text-teal-forest mb-6">
                    <CheckCircle2 size={44} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-900 mb-4">Application Submitted!</h3>
                  <p className="text-slate-500 font-light leading-relaxed max-w-md mx-auto mb-8">
                    Your details have been successfully uploaded to our system. Our recruitment team will review your application and contact you soon.
                  </p>
                  <button
                    onClick={() => setStatus({ type: null, message: "" })}
                    className="px-8 py-3 bg-teal-forest text-vanilla-latte text-[11px] uppercase tracking-widest font-bold hover:bg-teal-forest/90 transition-all rounded-sm"
                  >
                    Apply for Another Role
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {status.type === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5 rounded-lg">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="johndoe@example.com"
                          className="w-full pl-11 pr-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light"
                        />
                      </div>
                    </div>

                    {/* Position Applied For */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Position Applied For <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Briefcase size={16} />
                        </span>
                        <select
                          name="role"
                          required
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light appearance-none"
                        >
                          <option value="" disabled>Select a role...</option>
                          <option value="Telecaller / Inside Sales Executive">Telecaller / Inside Sales Executive</option>
                          <option value="Real Estate Sales Executive">Real Estate Sales Executive</option>
                          <option value="Business Development Executive">Business Development Executive</option>
                          <option value="Digital Marketing Executive">Digital Marketing Executive</option>
                          <option value="Customer Relationship Executive">Customer Relationship Executive</option>
                          <option value="Other Executive Position">Other Executive Position</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience level */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Total Experience <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Clock size={16} />
                        </span>
                        <select
                          name="experience"
                          required
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light appearance-none"
                        >
                          <option value="" disabled>Select your experience...</option>
                          <option value="Fresher / Entry Level">Fresher / Entry Level</option>
                          <option value="1-2 Years">1-2 Years</option>
                          <option value="2-5 Years">2-5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1">
                        Resume (PDF) <span className="text-red-500">*</span>
                      </label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border border-dashed rounded-sm p-4 text-center transition-all ${dragActive
                          ? "border-teal-forest bg-teal-forest/5 animate-pulse"
                          : formData.resumeFile
                            ? "border-emerald-500 bg-emerald-50/10"
                            : "border-slate-300 bg-[#FAFAFA] hover:border-teal-forest"
                          }`}
                      >
                        <input
                          type="file"
                          id="resume-upload"
                          accept=".pdf"
                          required={!formData.resumeFile}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileChange(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />

                        {!formData.resumeFile ? (
                          <label htmlFor="resume-upload" className="cursor-pointer block space-y-1 py-1">
                            <div className="flex justify-center text-slate-400">
                              <FileText size={28} className="text-teal-forest/80" />
                            </div>
                            <div className="text-xs text-slate-600 font-light">
                              <span className="font-bold text-teal-forest hover:underline">Click to upload</span> or drag and drop
                            </div>
                            <p className="text-[10px] text-slate-400 font-light">PDF files only, up to 5MB</p>
                          </label>
                        ) : (
                          <div className="flex items-center justify-between gap-3 p-1.5 bg-white rounded-md border border-slate-100 shadow-sm text-left">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
                                <FileText size={16} />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-semibold text-slate-900 truncate max-w-[160px] md:max-w-[200px]">
                                  {formData.resumeFile.name}
                                </p>
                                <p className="text-[10px] text-slate-400 font-light">
                                  {(formData.resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleFileChange(null)}
                              className="text-[10px] text-rose-500 hover:text-rose-700 font-medium tracking-wide uppercase shrink-0 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cover letter */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-slate-700">
                      Cover Letter / Message
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={5}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us about your background, achievements, and why you want to work with PropWisdom..."
                      className="w-full px-4 py-4 bg-[#FAFAFA] border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-teal-forest focus:bg-white transition-all text-slate-900 font-light"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-teal-forest hover:bg-teal-forest/90 text-vanilla-latte hover:text-white uppercase tracking-[0.25em] font-bold text-[12px] transition-all rounded-sm flex items-center justify-center gap-2.5 shadow-lg shadow-teal-forest/10 hover:shadow-teal-forest/20 disabled:bg-teal-forest/50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
