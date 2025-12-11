"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shield,
  Clock,
  FileCheck,
  Building2,
  Calculator,
  ChevronDown,
  CheckCircle2,
  Lock,
  Users,
  Banknote,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  BadgeCheck,
  Percent,
  Calendar,
  IndianRupee,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const whyChooseUs = [
    {
      icon: Building2,
      title: "RBI-Registered Lenders",
      description: "Compare offers from multiple verified banks & NBFCs",
    },
    {
      icon: Clock,
      title: "Quick Eligibility",
      description: "Check your eligibility in just 2 minutes",
    },
    {
      icon: FileCheck,
      title: "Transparent Terms",
      description: "No hidden fees — everything upfront",
    },
    {
      icon: Shield,
      title: "100% Digital",
      description: "Paperless process, anytime anywhere",
    },
    {
      icon: Lock,
      title: "Secure & Encrypted",
      description: "Bank-grade security for your data",
    },
    {
      icon: Users,
      title: "Consent-Based",
      description: "Your data shared only with your permission",
    },
  ];

  const loanFeatures = [
    { label: "Loan Amount", value: "₹5,000 – ₹10,00,000", icon: IndianRupee },
    { label: "Tenure", value: "3 – 60 months", icon: Calendar },
    { label: "APR", value: "10% – 36% p.a.", icon: Percent },
    { label: "Processing Fee", value: "Up to 2%", icon: Calculator },
  ];

  const partners = [
    "Navi",
    "Moneyview", 
    "Olyv",
    "BharatLoan",
    "InstaMoney",
    "& More",
  ];

  const howItWorks = [
    { step: "01", title: "Check Eligibility", desc: "Fill basic details & income info" },
    { step: "02", title: "Compare Offers", desc: "View personalized loan offers" },
    { step: "03", title: "Choose & Apply", desc: "Complete KYC online" },
    { step: "04", title: "Get Disbursal", desc: "Amount credited to your account" },
  ];

  const privacyPoints = [
    "We collect only essential information to assess loan eligibility",
    "All data is encrypted and stored securely",
    "We never sell or share information without consent",
    "Request deletion of your data anytime",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#eefe92]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <GridPattern
          width={50}
          height={50}
          x={0}
          y={0}
          squares={[
            [2, 3], [5, 1], [8, 4], [11, 2], [14, 5],
            [3, 7], [6, 9], [9, 6], [12, 8], [15, 3],
          ]}
          className="fill-[#4d7c0f]/8 stroke-[#4d7c0f]/15"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section 1: Why Choose LendingLeaf */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#4d7c0f]/20 rounded-full shadow-sm mb-4">
              <BadgeCheck className="w-3.5 h-3.5 text-[#4d7c0f]" />
              <span className="text-xs font-medium text-[#213d4f]">Trusted by 50,000+ Users</span>
            </div>
            <h2 className="font-termina text-2xl sm:text-3xl md:text-4xl font-bold text-[#213d4f]">
              Why Choose{" "}
              <span className="relative inline-block">
                <span className="relative z-10">LendingLeaf</span>
                <span className="absolute bottom-1 left-0 w-full h-2 sm:h-3 bg-[#eefe92] -z-0 rounded"></span>
              </span>
              ?
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-[#213d4f]/5 p-4 sm:p-5 text-center hover:bg-white hover:shadow-lg hover:border-[#4d7c0f]/20 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl bg-[#eefe92]/30 flex items-center justify-center group-hover:bg-[#eefe92] group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4d7c0f]" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#213d4f] mb-1">{item.title}</h3>
                <p className="text-[10px] sm:text-xs text-[#213d4f]/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Loan Features at a Glance + Partners */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Loan Features Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#213d4f]/8 p-5 sm:p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#213d4f] flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-[#eefe92]" />
                </div>
                <h3 className="font-termina text-lg sm:text-xl font-bold text-[#213d4f]">Loan Features at a Glance</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                {loanFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#f8fdf2] rounded-xl p-3 sm:p-4 border border-[#4d7c0f]/10"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <feature.icon className="w-3.5 h-3.5 text-[#4d7c0f]" />
                      <span className="text-[10px] sm:text-xs text-[#213d4f]/60 font-medium">{feature.label}</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#213d4f]">{feature.value}</p>
                  </div>
                ))}
              </div>

              <div className="text-xs text-[#213d4f]/50 space-y-1 border-t border-[#213d4f]/10 pt-4">
                <p>• Processing fee up to 2% of loan amount (+ applicable taxes)</p>
                <p>• Late payment, prepayment & foreclosure fees may apply as per lender policy</p>
              </div>
            </div>

            {/* Partners + Representative Example */}
            <div className="space-y-4 sm:space-y-6">
              {/* Partners */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#213d4f]/8 p-5 sm:p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4d7c0f] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#213d4f] text-sm sm:text-base">Our Lending Partners</h3>
                    <p className="text-[10px] sm:text-xs text-[#213d4f]/50">RBI-registered Banks & NBFCs only</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {partners.map((partner, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#f8fdf2] border border-[#4d7c0f]/15 rounded-full text-xs sm:text-sm font-medium text-[#213d4f]"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {/* Representative Example */}
              <div className="bg-gradient-to-br from-[#213d4f] to-[#1a3040] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-[#eefe92]" />
                  <h3 className="font-bold text-sm sm:text-base">Representative Example</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3">
                  <p className="text-xs sm:text-sm text-white/80 mb-2">For a loan of <span className="text-[#eefe92] font-bold">₹2,00,000</span> at <span className="text-[#eefe92] font-bold">15% APR</span> for <span className="text-[#eefe92] font-bold">24 months</span>:</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/50">Monthly EMI</p>
                      <p className="text-lg sm:text-xl font-bold text-[#eefe92]">₹9,699</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/50">Total Repayment</p>
                      <p className="text-lg sm:text-xl font-bold">₹2,32,776</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-white/40">*Includes Principal + Interest</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: How It Works (Compact) */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#213d4f]/8 p-5 sm:p-6 md:p-8 shadow-lg">
            <h3 className="font-termina text-lg sm:text-xl font-bold text-[#213d4f] text-center mb-6 sm:mb-8">
              How It Works
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {howItWorks.map((item, index) => (
                <div key={index} className="relative text-center">
                  {/* Connector Line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#4d7c0f]/30 to-[#4d7c0f]/10" />
                  )}
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#eefe92] flex items-center justify-center shadow-lg">
                      <span className="font-termina text-sm font-bold text-[#213d4f]">{item.step}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#213d4f] mb-1">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-[#213d4f]/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Data Privacy + Support (Side by Side) */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Data Privacy */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#213d4f]/8 p-5 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#22c55e]" />
                </div>
                <h3 className="font-bold text-[#213d4f] text-sm sm:text-base">Data Privacy & Security</h3>
              </div>
              <ul className="space-y-3">
                {privacyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#213d4f]/70">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Grievance */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#213d4f]/8 p-5 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <h3 className="font-bold text-[#213d4f] text-sm sm:text-base">Support & Grievance</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-xs text-[#213d4f]/50 font-medium">LendingLeaf (a product of Digitar Media Pvt. Ltd.)</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#213d4f]/70">
                  <Mail className="w-4 h-4 text-[#4d7c0f]" />
                  <a href="mailto:support@lendingleaf.in" className="hover:text-[#4d7c0f] transition-colors">support@lendingleaf.in</a>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#213d4f]/70">
                  <Phone className="w-4 h-4 text-[#4d7c0f]" />
                  <a href="tel:01144787244" className="hover:text-[#4d7c0f] transition-colors">011 4478 7244</a>
                  <span className="text-[10px] text-[#213d4f]/40">(Mon–Fri, 10 AM – 6 PM)</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#213d4f]/70">
                  <MapPin className="w-4 h-4 text-[#4d7c0f] flex-shrink-0 mt-0.5" />
                  <span>Ramesh Nagar, New Delhi - 110015</span>
                </div>
              </div>

              <div className="p-3 bg-[#fef3c7]/50 border border-[#f59e0b]/20 rounded-xl">
                <p className="text-[10px] sm:text-xs text-[#92400e]">
                  <strong>Complaints?</strong> Write to <a href="mailto:grievance@lendingleaf.in" className="underline">grievance@lendingleaf.in</a>. 
                  We resolve queries within 7 working days. Escalate to lender's grievance officer or RBI Ombudsman if unresolved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: CTA + Disclaimer */}
        <div
          className={`transition-all duration-700 delay-250 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* CTA */}
          <div className="text-center mb-8 sm:mb-10">
            <Button className="h-12 sm:h-14 px-8 sm:px-12 bg-[#213d4f] hover:bg-[#1a3240] text-white font-semibold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Check Your Eligibility Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#213d4f]/5 backdrop-blur-sm rounded-2xl border border-[#213d4f]/10 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#213d4f]/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] sm:text-xs text-[#213d4f]/60 leading-relaxed">
                  <strong className="text-[#213d4f]/80">Disclaimer:</strong> LendingLeaf is not a lender. It acts solely as a digital loan aggregator operated by Digitar Media Pvt. Ltd. 
                  All loan approvals, rates, and disbursals are subject to lender policies, eligibility, and credit checks. 
                  We do not charge users any fees for loan comparison services.
                </p>
                <p className="text-[9px] sm:text-[10px] text-[#213d4f]/40 mt-2">Last updated: October 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
