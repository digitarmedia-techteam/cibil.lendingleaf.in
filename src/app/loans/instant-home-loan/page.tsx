"use client";

import React, { useEffect, useRef, useState } from "react";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Clock,
  CheckCircle2,
  Shield,
  TrendingDown,
  Building2,
  Castle,
  TreePine,
  Store,
  FileText,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Percent,
  Calculator,
  BadgeCheck,
  Users,
  Landmark,
  MapPin,
  Key,
  Banknote,
  Receipt,
  Phone,
  Lock,
  ChevronRight,
} from "lucide-react";

export default function HomeLoanPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProperty, setActiveProperty] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({ disbursed: 0, customers: 0, rate: 0 });
  const [formStep, setFormStep] = useState(1); // 1: Phone, 2: OTP, 3: Application
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    loanAmount: "",
    propertyType: "",
    employmentType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate stats counter
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        disbursed: Math.round(2500 * eased),
        customers: Math.round(25000 * eased),
        rate: Math.round(8.4 * eased * 10) / 10,
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Auto-cycle property types
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProperty((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: TrendingDown,
      title: "Lowest Interest Rates",
      value: "8.4",
      suffix: "% p.a.",
      description: "Industry-leading rates starting from just 8.4% p.a.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Percent,
      title: "High LTV Ratio",
      value: "90",
      suffix: "%",
      description: "Get up to 90% of your property value as loan",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Clock,
      title: "Long Tenure",
      value: "30",
      suffix: "years",
      description: "Flexible repayment up to 30 years for lower EMIs",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Receipt,
      title: "Tax Benefits",
      value: "3.5",
      suffix: "L/yr",
      description: "Save up to ₹3.5 lakhs annually under Section 80C & 24",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const propertyTypes = [
    { icon: Building2, title: "Apartment", description: "Residential flats in societies", color: "#3b82f6", popular: true },
    { icon: Home, title: "Independent House", description: "Stand-alone residential buildings", color: "#22c55e", popular: false },
    { icon: Castle, title: "Villa/Bungalow", description: "Luxury independent homes", color: "#8b5cf6", popular: false },
    { icon: TreePine, title: "Plot/Land", description: "Plots for construction", color: "#f59e0b", popular: false },
    { icon: Store, title: "Commercial", description: "Shops, offices, warehouses", color: "#ef4444", popular: false },
  ];

  const eligibility = [
    { label: "Age", value: "21 - 65 years", icon: Users },
    { label: "Min Income", value: "₹25,000/month", icon: IndianRupee },
    { label: "Employment", value: "Min 2 years", icon: Landmark },
    { label: "Credit Score", value: "700+ for best rates", icon: TrendingDown },
  ];

  const documents = [
    { name: "KYC Documents", desc: "PAN, Aadhaar, Passport" },
    { name: "Income Proof", desc: "Salary slips, Form 16, ITR" },
    { name: "Bank Statements", desc: "Last 6 months" },
    { name: "Property Documents", desc: "Sale deed, NOC, approved plan" },
  ];

  const taxBenefits = [
    { section: "80C", amount: "₹1.5L", description: "On principal repayment" },
    { section: "24", amount: "₹2L", description: "On interest payment" },
    { section: "80EEA", amount: "₹50K", description: "For first-time buyers" },
  ];

  return (
    <div className="overflow-hidden relative">
      {/* Unified Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-white from-0% via-[#f8fdf2] via-30% to-[#eefe92]/15 to-100% -z-10" />

      {/* Inject Custom Animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 50px rgba(34, 197, 94, 0.4); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes house-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes counter-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-house-float { animation: house-float 4s ease-in-out infinite; }
        .animate-counter-pulse { animation: counter-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 pt-20 pb-8 sm:pt-24 sm:pb-12 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className={`order-2 lg:order-1 space-y-6 sm:space-y-8 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/60 border border-emerald-200/40 backdrop-blur-sm">
                <Home className="w-4 h-4 text-emerald-600 animate-house-float" />
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  Home Loans
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-termina font-black text-[#213d4f] leading-[1.05] tracking-tight">
                  Your Dream Home
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Affordable
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-emerald-200 -z-0 -rotate-1 rounded-sm"></span>
                  </span>{" "}
                  <span className="text-[#213d4f]/80">rates</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#213d4f]/60 max-w-xl leading-relaxed">
                  Get home loans up to <span className="text-emerald-600 font-bold">₹5 crores</span> with interest rates starting at{" "}
                  <span className="text-emerald-600 font-bold">8.4% p.a.</span> Flexible repayment up to 30 years.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                {[
                  { value: `₹${animatedStats.disbursed}Cr+`, label: "Disbursed", icon: Banknote },
                  { value: `${(animatedStats.customers / 1000).toFixed(0)}K+`, label: "Dream Homes", icon: Key },
                  { value: `${animatedStats.rate}%`, label: "Starting Rate", icon: TrendingDown },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`relative group text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#213d4f]/5 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                  >
                    <stat.icon className="w-5 h-5 text-emerald-600 mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-counter-pulse">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#213d4f]/50 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: BadgeCheck, text: "All Major Banks" },
                  { icon: Shield, text: "Zero Hidden Fees" },
                  { icon: MapPin, text: "Pan India" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-[#213d4f]/5 text-xs text-[#213d4f]/60"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Application Form */}
            <div
              className={`order-1 lg:order-2 flex justify-center lg:justify-end ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative">
                {/* Glow Effect Behind Form */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl scale-110 animate-pulse-glow" />
                <HomeLoanApplicationForm formStep={formStep} setFormStep={setFormStep} phone={phone} setPhone={setPhone} otp={otp} setOtp={setOtp} isPhoneSubmitted={isPhoneSubmitted} setIsPhoneSubmitted={setIsPhoneSubmitted} isOtpVerifying={isOtpVerifying} setIsOtpVerifying={setIsOtpVerifying} isOtpVerified={isOtpVerified} setIsOtpVerified={setIsOtpVerified} applicationData={applicationData} setApplicationData={setApplicationData} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/40 to-teal-200/30 rounded-full blur-3xl -z-10 animate-float-slow" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/30 to-green-200/30 rounded-full blur-3xl -z-10 animate-float-slow" style={{ animationDelay: "-3s" }} />
        
        <GridPattern className="absolute inset-0 -z-10 opacity-30" />
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/40 border border-emerald-200/40 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Why Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Benefits That Make{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Dreams Real
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C40 2 80 2 100 6C120 10 160 10 198 2" stroke="#a7f3d0" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  hoveredBenefit === index
                    ? "border-emerald-300 shadow-2xl scale-[1.02]"
                    : "border-[#213d4f]/5 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.value}
                  </span>
                  <span className="text-sm text-[#213d4f]/50 font-semibold">{feature.suffix}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-[#213d4f] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#213d4f]/60 leading-relaxed">{feature.description}</p>

                {/* Active Indicator */}
                {hoveredBenefit === index && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types - Interactive Showcase */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/40 border border-emerald-200/40 mb-6">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Property Types</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Finance{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600">Any</span>
                <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-emerald-200 -z-0 -rotate-1"></span>
              </span>{" "}
              Property
            </h2>
            <p className="text-base sm:text-lg text-[#213d4f]/60 max-w-2xl mx-auto">
              From apartments to commercial spaces — we cover all property types
            </p>
          </div>

          {/* Property Cards - Carousel Style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {propertyTypes.map((property, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-6 transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeProperty === index
                    ? "shadow-2xl scale-[1.05] z-10"
                    : "shadow-lg hover:shadow-xl"
                }`}
                style={{
                  border: activeProperty === index ? `2px solid ${property.color}40` : "2px solid transparent",
                }}
                onMouseEnter={() => setActiveProperty(index)}
              >
                {/* Popular Badge */}
                {property.popular && (
                  <div className="absolute -top-1 -right-1 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500">
                    Popular
                  </div>
                )}

                {/* Background Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: property.color }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ background: `${property.color}15` }}
                >
                  <property.icon className="w-8 h-8" style={{ color: property.color }} />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-[#213d4f] text-center mb-1">{property.title}</h3>
                <p className="text-xs text-[#213d4f]/50 text-center">{property.description}</p>

                {/* Bottom Line */}
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{
                    width: activeProperty === index ? "100%" : "0%",
                    background: property.color,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits - Visual */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Receipt className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Tax Benefits</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-termina font-black text-white mb-4">
                  Save Up to ₹3.5 Lakhs
                  <br />
                  <span className="text-emerald-200">Every Year</span>
                </h2>
                <p className="text-base text-white/70 max-w-xl mx-auto">
                  Maximize your tax savings under the Income Tax Act
                </p>
              </div>

              {/* Tax Cards */}
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {taxBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-xs text-emerald-200 font-semibold mb-2">Section {benefit.section}</div>
                    <div className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:scale-105 transition-transform">
                      {benefit.amount}
                    </div>
                    <div className="text-sm text-white/70">{benefit.description}</div>
                  </div>
                ))}
              </div>

              {/* Total Savings */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <IndianRupee className="w-8 h-8 text-emerald-200" />
                  <div>
                    <div className="text-sm text-white/70">Total Potential Savings</div>
                    <div className="text-3xl sm:text-4xl font-black text-white">Up to ₹3.5 Lakhs/year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Easy{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Requirements
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Eligibility */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#213d4f]/5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#213d4f]">Eligibility</h3>
                </div>

                <div className="space-y-4">
                  {eligibility.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#213d4f]/50 mb-0.5">{item.label}</div>
                        <div className="text-base font-bold text-[#213d4f]">{item.value}</div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#213d4f]/5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#213d4f]">Documents</h3>
                </div>

                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-100/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-blue-600 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-bold text-[#213d4f]">{doc.name}</div>
                        <div className="text-sm text-[#213d4f]/50">{doc.desc}</div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl border border-[#213d4f]/5 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-termina font-black text-[#213d4f] mb-4">
                Plan Your Home Loan EMI
              </h2>
              <p className="text-lg text-[#213d4f]/60 mb-8 max-w-md mx-auto">
                Use our calculator to find the perfect loan amount and tenure for your dream home
              </p>
              <Button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate EMI Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}

// Home Loan Application Form Component
function HomeLoanApplicationForm({
  formStep,
  setFormStep,
  phone,
  setPhone,
  otp,
  setOtp,
  isPhoneSubmitted,
  setIsPhoneSubmitted,
  isOtpVerifying,
  setIsOtpVerifying,
  isOtpVerified,
  setIsOtpVerified,
  applicationData,
  setApplicationData,
  isSubmitting,
  setIsSubmitting,
}: {
  formStep: number;
  setFormStep: (step: number) => void;
  phone: string;
  setPhone: (phone: string) => void;
  otp: string[];
  setOtp: (otp: string[]) => void;
  isPhoneSubmitted: boolean;
  setIsPhoneSubmitted: (submitted: boolean) => void;
  isOtpVerifying: boolean;
  setIsOtpVerifying: (verifying: boolean) => void;
  isOtpVerified: boolean;
  setIsOtpVerified: (verified: boolean) => void;
  applicationData: {
    fullName: string;
    email: string;
    loanAmount: string;
    propertyType: string;
    employmentType: string;
  };
  setApplicationData: (data: typeof applicationData) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
}) {
  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setIsPhoneSubmitted(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-move to next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpVerify = () => {
    setIsOtpVerifying(true);
    setTimeout(() => {
      setIsOtpVerifying(false);
      setIsOtpVerified(true);
      setFormStep(3);
    }, 1500);
  };

  const handleApplicationSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully!");
    }, 2000);
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-200/50 shadow-2xl shadow-emerald-500/10 overflow-hidden w-full max-w-md">
      {/* Gradient Top Border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />

      <div className="p-6 sm:p-8 min-h-[600px] flex flex-col">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                  formStep >= step
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-[#213d4f]/10 text-[#213d4f]/40"
                }`}
              >
                {formStep > step ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  step
                )}
                {formStep === step && (
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                )}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                    formStep > step ? "bg-emerald-500" : "bg-[#213d4f]/10"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Content - Grows to fill space */}
        <div className="flex-1 flex flex-col">
          {/* Step 1: Phone Number */}
          {formStep === 1 && !isPhoneSubmitted && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-[#213d4f] mb-2">Get Started</h3>
                <p className="text-sm text-[#213d4f]/60">Enter your mobile number to continue</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213d4f]/60 font-medium">+91</span>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(value);
                    }}
                    maxLength={10}
                    className="h-13 pl-14 rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/50 text-base font-semibold"
                  />
                </div>
                <p className="text-xs text-[#213d4f]/40">We'll send you an OTP to verify your number</p>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {formStep === 1 && isPhoneSubmitted && !isOtpVerified && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-[#213d4f] mb-2">Verify OTP</h3>
                <p className="text-sm text-[#213d4f]/60">
                  We've sent a 4-digit OTP to <span className="font-semibold text-emerald-600">+91{phone}</span>
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Enter OTP
                </label>

                {/* OTP Input Fields */}
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/50 transition-all duration-300"
                    />
                  ))}
                </div>

                <p className="text-xs text-[#213d4f]/40 text-center">4-digit code</p>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#213d4f]/50">
                  Didn't receive OTP?{" "}
                  <button className="text-emerald-600 font-semibold hover:underline">Resend in 30s</button>
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Application Form */}
          {formStep === 3 && isOtpVerified && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-[#213d4f] mb-2">Loan Details</h3>
                <p className="text-sm text-[#213d4f]/60">Complete your home loan application</p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#213d4f]">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={applicationData.fullName}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, fullName: e.target.value })
                  }
                  className="h-12 rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#213d4f]">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, email: e.target.value })
                  }
                  className="h-12 rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/50"
                />
              </div>

              {/* Loan Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  Loan Amount Needed
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213d4f]/60 font-medium">₹</span>
                  <Input
                    type="text"
                    placeholder="10,00,000"
                    value={applicationData.loanAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setApplicationData({ ...applicationData, loanAmount: value });
                    }}
                    className="h-12 pl-8 rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/50"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#213d4f]">Employment Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "salaried", label: "Salaried", icon: Landmark },
                    { value: "self-employed", label: "Self Employed", icon: Users },
                    { value: "business", label: "Business", icon: Store },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setApplicationData({ ...applicationData, employmentType: option.value })
                      }
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor:
                          applicationData.employmentType === option.value ? "#10b981" : "#a7f3d0",
                        backgroundColor:
                          applicationData.employmentType === option.value ? "#ecfdf5" : "transparent",
                      }}
                      type="button"
                    >
                      <option.icon className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-medium text-[#213d4f] text-center">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            
            </div>
          )}
        </div>

        {/* Footer Buttons - Always at bottom */}
        <div className="mt-8 space-y-3 border-t border-[#213d4f]/5 pt-6">
          {formStep === 1 && !isPhoneSubmitted && (
            <>
              <Button
                onClick={handlePhoneSubmit}
                disabled={phone.length !== 10}
                className="w-full h-13 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span>Send OTP</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <p className="text-xs text-[#213d4f]/50">Your number is safe and secure with us</p>
              </div>
            </>
          )}

          {formStep === 1 && isPhoneSubmitted && !isOtpVerified && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPhoneSubmitted(false);
                  setOtp(["", "", "", ""]);
                }}
                className="flex-1 h-13 border-2 border-[#213d4f]/10 text-[#213d4f] hover:bg-[#f8fdf2] rounded-xl"
              >
                Change Number
              </Button>
              <Button
                onClick={handleOtpVerify}
                disabled={otp.join("").length !== 4 || isOtpVerifying}
                className="flex-1 h-13 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOtpVerifying ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span>Verify OTP</span>
                )}
              </Button>
            </div>
          )}

          {formStep === 3 && isOtpVerified && (
            <>
              <Button
                onClick={handleApplicationSubmit}
                disabled={
                  !applicationData.fullName ||
                  !applicationData.email ||
                  !applicationData.loanAmount ||
                  !applicationData.employmentType ||
                  isSubmitting
                }
                className="w-full h-13 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <p className="text-xs text-[#213d4f]/50">Your details are 100% secure and encrypted</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
