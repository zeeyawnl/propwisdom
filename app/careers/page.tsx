import CareersContent from "./CareersContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at PROPWisdom | Pune Real Estate Job Opportunities",
  description: "Join the MahaRERA registered real estate consulting firm in Pune. Apply for roles including Telecaller, Inside Sales Executive, Real Estate Sales Executive, and Business Development.",
  keywords: "Real Estate Jobs Pune, Telecaller Jobs Pune, Real Estate Sales Executive, PROPWisdom Careers, Property Consulting Careers Pune",
};

export default function CareersPage() {
  return <CareersContent />;
}
