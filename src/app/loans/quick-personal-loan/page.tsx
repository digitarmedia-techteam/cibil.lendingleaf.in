"use client";

import React, { useEffect, useRef, useState } from "react";
import LoanApplicationForm from "../../../components/blocks/LoanApplicationForm";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Clock,
  CheckCircle2,
  Shield,
  TrendingUp,
  Heart,
  Plane,
  GraduationCap,
  Home,
  ShoppingBag,
  Briefcase,
  FileText,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  BadgeCheck,
  Timer,
  Calculator,
} from "lucide-react";

export default function PersonalLoanPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({ disbursed: 0, customers: 0, approval: 0 });
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
        disbursed: Math.round(500 * eased),
        customers: Math.round(50000 * eased),
        approval: Math.round(24 * eased),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Auto-cycle features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Lowest Interest Rates",
      value: "10.49%",
      suffix: "p.a.",
      description: "Starting from just 10.49% p.a. - among the lowest in the market",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Zap,
      title: "Instant Disbursal",
      value: "24",
      suffix: "hrs",
      description: "Get funds credited to your account within 24 hours of approval",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: FileText,
      title: "Minimal Documents",
      value: "3",
      suffix: "docs",
      description: "Just PAN, Aadhaar, and bank statement - that's all you need",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Timer,
      title: "Flexible Tenure",
      value: "60",
      suffix: "months",
      description: "Choose a repayment tenure that suits your financial situation",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const useCases = [
    { icon: Heart, title: "Medical Emergency", description: "Cover unexpected medical expenses instantly", color: "#ef4444" },
    { icon: Home, title: "Home Renovation", description: "Transform your living space", color: "#3b82f6" },
    { icon: Plane, title: "Dream Vacation", description: "Travel now, pay later comfortably", color: "#8b5cf6" },
    { icon: GraduationCap, title: "Education", description: "Invest in yourself or your loved ones", color: "#06b6d4" },
    { icon: ShoppingBag, title: "Wedding Expenses", description: "Celebrate your big day stress-free", color: "#ec4899" },
    { icon: Briefcase, title: "Business Needs", description: "Fuel your entrepreneurial journey", color: "#22c55e" },
  ];

  const eligibility = [
    { label: "Age", value: "21 - 60 years", icon: Users },
    { label: "Min Income", value: "₹15,000/month", icon: IndianRupee },
    { label: "Employment", value: "Salaried/Self-employed", icon: Briefcase },
    { label: "Credit Score", value: "650+ preferred", icon: TrendingUp },
  ];

  const documents = [
    "PAN Card",
    "Aadhaar Card",
    "Latest 3 months' salary slips",
    "6 months' bank statement",
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
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); }
          50% { box-shadow: 0 0 50px rgba(168, 85, 247, 0.4); }
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
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/60 border border-purple-200/40 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                  Quick Personal Loans
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-termina font-black text-[#213d4f] leading-[1.05] tracking-tight">
                  Personal Loans
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Instant
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-purple-200 -z-0 -rotate-1 rounded-sm"></span>
                  </span>{" "}
                  <span className="text-[#213d4f]/80">approval</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#213d4f]/60 max-w-xl leading-relaxed">
                  Get up to <span className="text-purple-600 font-bold">₹40 lakhs</span> personal loan with minimal documentation.
                  Quick approval, flexible tenure, and competitive interest rates.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                {[
                  { value: `₹${animatedStats.disbursed}Cr+`, label: "Disbursed", icon: IndianRupee },
                  { value: `${(animatedStats.customers / 1000).toFixed(0)}K+`, label: "Happy Customers", icon: Users },
                  { value: `${animatedStats.approval}h`, label: "Avg. Approval", icon: Timer },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`relative group text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#213d4f]/5 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                  >
                    <stat.icon className="w-5 h-5 text-purple-600 mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-counter-pulse">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#213d4f]/50 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: BadgeCheck, text: "RBI Registered Partners" },
                  { icon: Shield, text: "100% Secure" },
                  { icon: Zap, text: "24hr Disbursal" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-[#213d4f]/5 text-xs text-[#213d4f]/60"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-purple-600" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl scale-110 animate-pulse-glow" />
                <LoanApplicationForm loanType="personal" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-pink-200/30 rounded-full blur-3xl -z-10 animate-float-slow" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl -z-10 animate-float-slow" style={{ animationDelay: "-3s" }} />
        
        <GridPattern className="absolute inset-0 -z-10 opacity-30" />
      </section>

      {/* Features Section - Animated Cards */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/40 border border-purple-200/40 mb-6">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Benefits That{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Stand Out
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C40 2 80 2 100 6C120 10 160 10 198 2" stroke="#d8b4fe" strokeWidth="4" strokeLinecap="round" />
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
                  activeFeature === index
                    ? "border-purple-300 shadow-2xl scale-[1.02]"
                    : "border-[#213d4f]/5 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
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
                {activeFeature === index && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Interactive Grid */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/40 border border-purple-200/40 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Use Cases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Perfect For{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-purple-600">Every</span>
                <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-purple-200 -z-0 -rotate-1"></span>
              </span>{" "}
              Need
            </h2>
            <p className="text-base sm:text-lg text-[#213d4f]/60 max-w-2xl mx-auto">
              From emergencies to celebrations — we've got you covered for life's every moment
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 border border-[#213d4f]/5 transition-all duration-500 cursor-pointer overflow-hidden ${
                  hoveredUseCase === index ? "shadow-2xl scale-[1.03]" : "shadow-lg hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredUseCase(index)}
                onMouseLeave={() => setHoveredUseCase(null)}
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${useCase.color}, ${useCase.color}50)` }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `${useCase.color}15` }}
                  >
                    <useCase.icon className="w-7 h-7" style={{ color: useCase.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#213d4f] mb-1 group-hover:text-[#213d4f] transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-[#213d4f]/60">{useCase.description}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    className="w-5 h-5 text-[#213d4f]/20 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                {/* Bottom Border Animation */}
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{
                    width: hoveredUseCase === index ? "100%" : "0%",
                    background: useCase.color,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
              Simple{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Eligibility
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#213d4f]/60 max-w-2xl mx-auto">
              Quick checklist to see if you qualify
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Eligibility */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#213d4f]/5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#213d4f]">Eligibility Criteria</h3>
                </div>

                <div className="space-y-4">
                  {eligibility.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-purple-50/50 hover:bg-purple-100/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-purple-600" />
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
                  <h3 className="text-2xl font-bold text-[#213d4f]">Required Documents</h3>
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
                      <span className="flex-1 text-base text-[#213d4f] font-medium">{doc}</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50">
                  <p className="text-sm text-[#213d4f]/70">
                    <span className="font-semibold text-purple-600">Pro tip:</span> Keep digital copies ready for faster processing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-termina font-black mb-4">
                Calculate Your EMI
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
                Use our EMI calculator to plan your monthly payments and choose the perfect tenure
              </p>
              <Button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                className="h-14 px-8 bg-white hover:bg-white/90 text-purple-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Try EMI Calculator
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
