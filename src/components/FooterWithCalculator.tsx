"use client";

import React, { FormEvent, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  ArrowRight,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type LoanType = "home" | "personal" | "car" | "education";

interface LoanPreset {
  name: string;
  icon: React.ElementType;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  minTenure: number;
  maxTenure: number;
  defaultTenure: number;
}

const loanPresets: Record<LoanType, LoanPreset> = {
  home: {
    name: "Home",
    icon: Home,
    minAmount: 500000,
    maxAmount: 50000000,
    defaultAmount: 3000000,
    minRate: 8.5,
    maxRate: 12,
    defaultRate: 9.5,
    minTenure: 5,
    maxTenure: 30,
    defaultTenure: 20,
  },
  personal: {
    name: "Personal",
    icon: Briefcase,
    minAmount: 50000,
    maxAmount: 4000000,
    defaultAmount: 300000,
    minRate: 10.5,
    maxRate: 24,
    defaultRate: 14,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 3,
  },
  car: {
    name: "Car",
    icon: Car,
    minAmount: 100000,
    maxAmount: 10000000,
    defaultAmount: 600000,
    minRate: 8,
    maxRate: 15,
    defaultRate: 10.5,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 5,
  },
  education: {
    name: "Education",
    icon: GraduationCap,
    minAmount: 100000,
    maxAmount: 7500000,
    defaultAmount: 800000,
    minRate: 8,
    maxRate: 14,
    defaultRate: 10,
    minTenure: 3,
    maxTenure: 15,
    defaultTenure: 7,
  },
};

// Footer Links Data
const quickLinks = [
  { label: "Home Loan", href: "/loans/home" },
  { label: "Personal Loan", href: "/loans/personal" },
  { label: "Car Loan", href: "/loans/car" },
  { label: "Credit Score", href: "/credit-score" },
  { label: "Credit Cards", href: "/credit-cards" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export function FooterWithCalculator() {
  // Calculator State
  const [loanType, setLoanType] = useState<LoanType>("home");
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const preset = loanPresets[loanType];

  // Calculate EMI
  const calculateEMI = useCallback(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = tenure * 12;

    if (monthlyRate === 0) return principal / tenureMonths;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    return emi;
  }, [loanAmount, interestRate, tenure]);

  const emi = calculateEMI();
  const tenureMonths = tenure * 12;
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  // Handle loan type change
  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    const newPreset = loanPresets[type];
    setLoanAmount(newPreset.defaultAmount);
    setInterestRate(newPreset.defaultRate);
    setTenure(newPreset.defaultTenure);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  // Slider percentage
  const getSliderPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Newsletter handler
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      setEmail("");
    }, 800);
  };

  return (
    <footer className="relative bg-[#213d4f] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#eefe92]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#4d7c0f]/10 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section - Calculator + Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-16">
          
          {/* Left Side - EMI Calculator */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/[0.07] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
              {/* Calculator Header */}
              <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#eefe92]/20 flex items-center justify-center">
                      <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#eefe92]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">Quick EMI Calculator</h3>
                      <p className="text-[10px] sm:text-xs text-white/50">Plan your loan instantly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Loan Type Selector */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                  {(Object.keys(loanPresets) as LoanType[]).map((type) => {
                    const Icon = loanPresets[type].icon;
                    const isActive = loanType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => handleLoanTypeChange(type)}
                        className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-[#eefe92] text-[#213d4f]"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[9px] sm:text-xs font-medium">{loanPresets[type].name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sliders */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-white/60 flex items-center gap-1.5">
                        <IndianRupee className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Loan Amount
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#eefe92]">{formatCurrency(loanAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min={preset.minAmount}
                      max={preset.maxAmount}
                      step={preset.minAmount >= 500000 ? 100000 : 10000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full h-1.5 sm:h-2 rounded-full appearance-none cursor-pointer footer-slider"
                      style={{
                        background: `linear-gradient(to right, #eefe92 ${getSliderPercentage(loanAmount, preset.minAmount, preset.maxAmount)}%, rgba(255,255,255,0.1) ${getSliderPercentage(loanAmount, preset.minAmount, preset.maxAmount)}%)`,
                      }}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-white/60 flex items-center gap-1.5">
                        <Percent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Interest Rate
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#eefe92]">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={preset.minRate}
                      max={preset.maxRate}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-1.5 sm:h-2 rounded-full appearance-none cursor-pointer footer-slider"
                      style={{
                        background: `linear-gradient(to right, #eefe92 ${getSliderPercentage(interestRate, preset.minRate, preset.maxRate)}%, rgba(255,255,255,0.1) ${getSliderPercentage(interestRate, preset.minRate, preset.maxRate)}%)`,
                      }}
                    />
                  </div>

                  {/* Tenure */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-white/60 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Tenure
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#eefe92]">{tenure} Years</span>
                    </div>
                    <input
                      type="range"
                      min={preset.minTenure}
                      max={preset.maxTenure}
                      step={1}
                      value={tenure}
                      onChange={(e) => setTenure(parseInt(e.target.value))}
                      className="w-full h-1.5 sm:h-2 rounded-full appearance-none cursor-pointer footer-slider"
                      style={{
                        background: `linear-gradient(to right, #eefe92 ${getSliderPercentage(tenure, preset.minTenure, preset.maxTenure)}%, rgba(255,255,255,0.1) ${getSliderPercentage(tenure, preset.minTenure, preset.maxTenure)}%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="mt-5 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#eefe92]/20 to-[#eefe92]/5 border border-[#eefe92]/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm text-white/70">Monthly EMI</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#eefe92] text-sm sm:text-base">₹</span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-termina">
                        {Math.round(emi).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-[10px] sm:text-xs text-white/50 mb-0.5">Total Interest</p>
                      <p className="text-xs sm:text-sm font-semibold text-white">{formatCurrency(totalInterest)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] sm:text-xs text-white/50 mb-0.5">Total Payment</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#eefe92]">{formatCurrency(totalPayment)}</p>
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                <Button className="w-full mt-4 h-10 sm:h-11 bg-[#eefe92] hover:bg-[#e0f080] text-[#213d4f] font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-300 group">
                  Apply for {loanPresets[loanType].name} Loan
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Links & Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Brand Section */}
            <div>
              <Link href="/" className="inline-block">
                <h2 className="font-termina text-2xl sm:text-3xl font-bold text-white">
                  Lending<span className="text-[#eefe92]">Leaf</span>
                </h2>
              </Link>
              <p className="mt-3 text-sm text-white/60 max-w-md leading-relaxed">
                Your trusted partner for smart financial decisions. Compare loans, check credit scores, 
                and find the best rates - all in one place.
              </p>

              {/* Contact Info */}
              <div className="mt-5 space-y-2.5">
                <a href="mailto:hello@lendingleaf.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-[#eefe92] transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@lendingleaf.com
                </a>
                <a href="tel:+911800123456" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-[#eefe92] transition-colors">
                  <Phone className="w-4 h-4" />
                  1800-123-456 (Toll Free)
                </a>
                <div className="flex items-start gap-2.5 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Ramesh Nagar, New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 sm:mb-4">Products</h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-[#eefe92] transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 sm:mb-4">Company</h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-[#eefe92] transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 sm:mb-4">Legal</h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-[#eefe92] transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/10 mt-16">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#eefe92]" />
                <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
              </div>
              <p className="text-xs text-white/50 mb-3">Get rate alerts & financial tips directly to your inbox.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-9 sm:h-10 bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm rounded-lg focus:border-[#eefe92]/50 focus:ring-[#eefe92]/20"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-9 sm:h-10 px-4 bg-[#eefe92] hover:bg-[#e0f080] text-[#213d4f] font-medium text-sm rounded-lg"
                >
                  {status === "success" ? "✓" : "Subscribe"}
                </Button>
              </form>
              {status === "success" && (
                <p className="text-xs text-[#eefe92] mt-2">Thanks! Check your inbox.</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-white/40 text-center sm:text-left">
              © {new Date().getFullYear()} LendingLeaf. All rights reserved. Made with 💚 in India
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <Facebook className="w-4 h-4" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram className="w-4 h-4" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <Twitter className="w-4 h-4" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx global>{`
        .footer-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #eefe92;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #213d4f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .footer-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(238, 254, 146, 0.4);
        }
        
        .footer-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #eefe92;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #213d4f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .footer-slider:focus {
          outline: none;
        }
      `}</style>
    </footer>
  );
}

function SocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#eefe92]/20 hover:text-[#eefe92] hover:border-[#eefe92]/30 transition-all duration-300"
    >
      {children}
    </a>
  );
}

export default FooterWithCalculator;
