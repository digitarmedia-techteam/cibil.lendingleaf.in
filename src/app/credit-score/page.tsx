"use client";

import React, { useEffect, useRef, useState } from "react";
import CreditScoreCard from "@/components/blocks/AccentCard";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Award,
  BarChart3,
  Lock,
  Eye,
  User,
  Phone,
  Calendar,
  FileText,
  ChevronRight,
  Star,
  BadgeCheck,
  Fingerprint,
  Gift,
} from "lucide-react";

export default function CreditScorePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredTip, setHoveredTip] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    checks: 0,
    accuracy: 0,
  });
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    pan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiScore, setApiScore] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [scoreComplete, setScoreComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

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

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mobile floating button - only active on mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (!e.matches) {
        // Desktop: always hide floating button
        setShowFloatingButton(false);
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Only set up observer on mobile
    if (mediaQuery.matches && sentinelRef.current) {
      const sentinelObserver = new IntersectionObserver(
        ([entry]) => {
          // Only show button when sentinel is OUT of view (scrolled past hero)
          setShowFloatingButton(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: '0px' }
      );

      sentinelObserver.observe(sentinelRef.current);

      // Listen for resize events
      mediaQuery.addEventListener('change', handleMediaChange);

      return () => {
        sentinelObserver.disconnect();
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    } else {
      // Listen for resize events even if initially desktop
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }
  }, []);

  // Form visibility observer (desktop only)
  useEffect(() => {
    const formObserver = new IntersectionObserver(
      ([entry]) => {
        setFormVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (formRef.current) {
      formObserver.observe(formRef.current);
    }

    return () => {
      formObserver.disconnect();
    };
  }, []);

  // Scroll to top when scoreComplete flips true (mobile only)
  useEffect(() => {
    if (!scoreComplete) return;
    try {
      const mq = window.matchMedia('(max-width: 1024px)');
      if (mq.matches) {
        // Smooth scroll to top on mobile/tablet
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger a small confetti burst after scroll starts. Dynamically import
        // the lightweight `canvas-confetti` package so we only load it client-side
        // and when needed.
        setTimeout(async () => {
          try {
            const mod = await import('canvas-confetti');
            const confetti = (mod && (mod as any).default) || mod;

            // Multiple bursts for a fuller effect
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { x: 0.5, y: 0.2 },
            });
            confetti({
              particleCount: 40,
              spread: 90,
              origin: { x: 0.1, y: 0.3 },
            });
            confetti({
              particleCount: 40,
              spread: 90,
              origin: { x: 0.9, y: 0.3 },
            });
          } catch (err) {
            // If the import or confetti fails, ignore — not critical
          }
        }, 300);
      }
    } catch (e) {
      // window or matchMedia may not be available in some environments — fail silently
    }
  }, [scoreComplete]);

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
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedStats({
        checks: Math.round(300000 * eased),
        accuracy: Math.round(99.9 * eased * 10) / 10,
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Auto-cycle through sections
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const tips = [
    {
      title: "Pay Bills on Time",
      description:
        "Payment history is the most important factor. Set up automatic payments to never miss a due date.",
      icon: Clock,
      color: "#22c55e",
      impact: "+35%",
    },
    {
      title: "Keep Credit Utilization Low",
      description:
        "Use less than 30% of your available credit. Lower is better - aim for under 10%.",
      icon: BarChart3,
      color: "#3b82f6",
      impact: "+30%",
    },
    {
      title: "Don't Close Old Accounts",
      description:
        "Length of credit history matters. Keep old cards active even if you don't use them often.",
      icon: Lock,
      color: "#a855f7",
      impact: "+15%",
    },
    {
      title: "Limit Hard Inquiries",
      description:
        "Too many credit applications in a short time can hurt your score. Apply only when necessary.",
      icon: Eye,
      color: "#f59e0b",
      impact: "+10%",
    },
    {
      title: "Monitor Your Credit Report",
      description:
        "Check for errors regularly. Dispute any inaccuracies you find with the credit bureau.",
      icon: Target,
      color: "#ef4444",
      impact: "+10%",
    },
  ];

  const scoreRanges = [
    {
      range: "300-579",
      label: "Poor",
      color: "red",
      gradient: "from-red-500 to-red-600",
      width: "25%",
    },
    {
      range: "580-669",
      label: "Fair",
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
      width: "50%",
    },
    {
      range: "670-739",
      label: "Good",
      color: "lime",
      gradient: "from-lime-500 to-lime-600",
      width: "75%",
    },
    {
      range: "740-900",
      label: "Excellent",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      width: "100%",
    },
  ];

  // Function to get score label and color based on score value
  const getScoreDetails = (score: number) => {
    if (score >= 740)
      return {
        label: "Excellent",
        color: "#22c55e",
        message:
          "Outstanding! You're eligible for premium loans with the best rates.",
      };
    if (score >= 670)
      return {
        label: "Good",
        color: "#84cc16",
        message:
          "Great score! You qualify for competitive interest rates and loan offers.",
      };
    if (score >= 580)
      return {
        label: "Fair",
        color: "#f59e0b",
        message:
          "Good start! Work on improving your score for better loan terms.",
      };
    return {
      label: "Poor",
      color: "#ef4444",
      message:
        "Focus on building your credit history for better loan opportunities.",
    };
  };

  // Function to handle credit score check API call
  const handleCheckScore = async () => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/credit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullName,
          mobile: formData.phone,
          loanType: "credit-score-check",
        }),
      });

      const data = await response.json();

      if (data.status && data.score) {
        setApiScore(data.score);
        setShowSuccess(true);
      } else {
        setApiError(
          data.msg || "Failed to fetch credit score. Please try again."
        );
      }
    } catch (error) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden relative">
      {/* Unified Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-white from-0% via-[#f8fdf2] via-30% to-[#eefe92]/15 to-100% -z-10" />

      {/* Inject Custom Animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(77, 124, 15, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(77, 124, 15, 0.4);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>


      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] px-1 sm:px-6 md:px-10 lg:px-14 xl:px-20 pt-16 pb-6 sm:pt-24 sm:pb-12 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-16 items-center">
            {/* Left Content */}
            <div
            id="tilllastcardactive"
              className={`order-2 lg:order-1 space-y-3 sm:space-y-8 px-3 sm:px-0 ${
                scoreComplete ? "hidden" : isVisible ? "animate-slide-up" : "opacity-0"
              }`}
            >
              {/* Badge */}
              <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eefe92]/40 border border-[#4d7c0f]/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#4d7c0f] animate-pulse" />
                {/* <span className="text-xs font-semibold text-[#4d7c0f] uppercase tracking-wider"> */}
                Free Credit Score Check
                {/* </span> */}
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] font-termina font-black text-[#213d4f] leading-[1.1] tracking-tight mt-6 text-center lg:text-start lg:mt-0">
                  Know your{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] bg-clip-text text-transparent">
                      score
                    </span>
                    <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[#eefe92] -z-0 -rotate-1 rounded-sm"></span>
                  </span>
                  <br />
                  <span className="text-[#213d4f]/80">
                    get instant personal loan{" "}
                  </span>{" "}
                  <span className="relative">
                    {/* <span className="text-[#4d7c0f] lg:text-4xl text-2xl ml-2 ">₹</span> */}
                    approval
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#213d4f]/60 max-w-xl leading-relaxed">
                  Check your credit score instantly for free. No hidden charges,
                  no impact on your score.
                  <span className="text-[#4d7c0f] font-medium">
                    {" "}
                    Get personalized loan offers
                  </span>{" "}
                  based on your creditworthiness.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                {[
                  {
                    value: `${(animatedStats.checks / 1000).toFixed(0)}K+`,
                    label: "Scores Checked",
                    icon: CheckCircle2,
                  },
                  {
                    value: `${animatedStats.accuracy}%`,
                    label: "Accuracy",
                    icon: Target,
                  },
                  { value: "Zero", label: "Score Impact", icon: Shield },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`relative group text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#213d4f]/5 hover:border-[#4d7c0f]/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                  >
                    <stat.icon className="w-5 h-5 text-[#4d7c0f] mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#4d7c0f]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#213d4f]/50 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="lg:flex flex-wrap items-center gap-3 hidden ">
                {[
                  { icon: Shield, text: "Bank-grade Security" },
                  { icon: Zap, text: "60-Second Results" },
                  { icon: Lock, text: "Data Protected" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-[#213d4f]/5 text-xs text-[#213d4f]/60"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-[#4d7c0f]" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Eligible Offers Section - Shows after score is complete */}
            <div 
              id="finalstepactivedisplaycards" 
              className={`order-2 lg:order-1 ${
                scoreComplete ? "block" : "hidden absolute"
              }`}
            >
              <div className="space-y-6">
                {/* Section Header */}
                <div className="text-center lg:text-left">
                  {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eefe92]/30 border border-[#4d7c0f]/20 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-[#4d7c0f]" />
                    <span className="text-xs font-semibold text-[#4d7c0f] uppercase tracking-wider">
                      Personalized for You
                    </span>
                  </div> */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-termina font-black text-[#213d4f] mb-3 leading-tight">
                    Your{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] bg-clip-text text-transparent">
                        Eligible Offers
                      </span>
                      <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[#eefe92] -z-0 -rotate-1 rounded-sm"></span>
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#213d4f]/60 mb-6">
                    Based on your credit score, here are the best loan offers available for you
                  </p>
                </div>

                {/* Offers Container - Vertical Stack */}
                <div className="space-y-4">
                  {/* Offer Cards */}
                  {[
                    {
                      name: "Navi Personal Loan",
                      highlights: ["Up to ₹20 lakhs at 10.49% p.a.", "Instant approval in 5 minutes"],
                      badge: "Fastest",
                    },
                    {
                      name: "HDFC Bank Personal Loan",
                      highlights: ["Pre-approved offer at 10.75% p.a.", "No prepayment charges"],
                      badge: "Trusted",
                    },
                    {
                      name: "ICICI Bank FlexiLoan",
                      highlights: ["Flexible EMI options available", "₹50,000 to ₹15 lakhs"],
                      badge: "Flexible",
                    },
                    {
                      name: "Bajaj Finserv Personal Loan",
                      highlights: ["Get up to ₹25 lakhs", "Minimal documentation required"],
                      badge: "Best Amount",
                    },
                    {
                      name: "Tata Capital Personal Loan",
                      highlights: ["Competitive rates from 10.99%", "Quick disbursal in 48 hours"],
                      badge: "Quick",
                    },
                  ].map((offer, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl border border-[#213d4f]/8 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4d7c0f]/0 to-[#eefe92]/0 group-hover:from-[#4d7c0f]/5 group-hover:to-[#eefe92]/10 transition-all duration-300" />
                      
                      {/* Logo Badge at top right */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-[#f8fdf2] to-[#eefe92]/20 border-2 border-[#4d7c0f]/15 flex items-center justify-center flex-shrink-0 group-hover:border-[#4d7c0f]/30 group-hover:shadow-lg transition-all duration-300">
                          <span className="text-[8px] sm:text-[10px] font-black text-[#4d7c0f]/40 text-center px-1">{["Navi", "HDFC", "ICICI", "Bajaj", "Tata"][index]}</span>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="relative z-10">
                        {/* Header with Logo - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 pr-16 sm:pr-0">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#213d4f] mb-1 group-hover:text-[#4d7c0f] transition-colors line-clamp-2">{offer.name}</h3>
                            <div className="h-1 w-12 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          {/* Logo Placeholder - Desktop only */}
                          <div className="hidden sm:flex w-16 h-16 rounded-xl bg-gradient-to-br from-[#f8fdf2] to-[#eefe92]/20 border-2 border-[#4d7c0f]/10 items-center justify-center flex-shrink-0 group-hover:border-[#4d7c0f]/30 transition-colors">
                            <span className="text-[9px] sm:text-xs font-black text-[#4d7c0f]/30 text-center">Logo</span>
                          </div>
                        </div>

                        {/* Highlights - Responsive layout */}
                        <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6 w-full sm:max-w-[85%]">
                          {offer.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-[#213d4f]/70 group-hover:text-[#213d4f] transition-colors">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#4d7c0f]/20 flex items-center justify-center flex-shrink-0 -mt-0.5 sm:mt-0 group-hover:bg-[#4d7c0f]/40 transition-colors">
                                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#4d7c0f]" />
                              </div>
                              <span className="leading-snug">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button - Responsive sizing */}
                        <button className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-md hover:shadow-lg active:shadow-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-1.5 sm:gap-2 group/btn">
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>

                      {/* Decorative accent */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#eefe92]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Credit Score Card */}
            <div
              className={`order-1 lg:order-2 flex justify-center lg:justify-start mx-2 sm:mx-0 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative w-full lg:w-auto -mt-14 lg:mt-0 ">
                {/* Glow Effect Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4d7c0f]/20 to-[#eefe92]/30 blur-3xl scale-110 animate-pulse-glow" />
                <div className="sm:scale-100">
                  <CreditScoreCard onScoreComplete={() => setScoreComplete(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sentinel for mobile floating CTA */}
        <div ref={sentinelRef} className="h-0" aria-hidden="true" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#eefe92]/30 to-[#4d7c0f]/10 rounded-full blur-3xl -z-10 animate-float-slow" />
        <div
          className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#4d7c0f]/10 to-[#22c55e]/10 rounded-full blur-3xl -z-10 animate-float-slow"
          style={{ animationDelay: "-3s" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#4d7c0f]/20 animate-float-slow"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>

        <GridPattern className="absolute inset-0 -z-10 opacity-30" />
      </section>
      

      <div className="hidden lg:inline">
        {/* Credit Score Check Form Section - Hidden on Mobile */}
        <section
          ref={formRef}
          className="hidden lg:block relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto ">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Form */}
              <div
                className={`transition-all duration-700 ${
                  formVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                {/* Form Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#eefe92]/50 to-[#4d7c0f]/10 border border-[#4d7c0f]/20 mb-4">
                    <Fingerprint className="w-4 h-4 text-[#4d7c0f]" />
                    <span className="text-xs font-bold text-[#4d7c0f] uppercase tracking-wider">
                      Free Score Check
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-termina font-black text-[#213d4f] mb-4">
                    Get Your Score in{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-[#4d7c0f]">
                        60 Seconds
                      </span>
                      <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[#eefe92] -z-0 -rotate-1 rounded-sm"></span>
                    </span>
                  </h2>
                  <p className="text-[#213d4f]/60 text-base sm:text-lg">
                    No credit card required. No impact on your score. Just
                    instant insights.
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                          formStep >= step
                            ? "bg-gradient-to-br from-[#4d7c0f] to-[#22c55e] text-white shadow-lg shadow-[#4d7c0f]/30"
                            : "bg-[#213d4f]/10 text-[#213d4f]/40"
                        }`}
                      >
                        {formStep > step ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          step
                        )}
                        {formStep === step && (
                          <div className="absolute inset-0 rounded-full bg-[#4d7c0f]/30 animate-ping" />
                        )}
                      </div>
                      {step < 2 && (
                        <div
                          className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                            formStep > step ? "bg-[#4d7c0f]" : "bg-[#213d4f]/10"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Form Card */}
                {!showSuccess ? (
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-[#eefe92]/50 shadow-2xl shadow-[#4d7c0f]/10 overflow-hidden">
                    {/* Gradient Top Border */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4d7c0f] via-[#22c55e] to-[#eefe92]" />

                    <div className="p-6 sm:p-8">
                      {formStep === 1 ? (
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                              <User className="w-4 h-4 text-[#4d7c0f]" />
                              Full Name (as per PAN)
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  fullName: e.target.value,
                                })
                              }
                              className="h-13 rounded-xl border-[#213d4f]/10 focus:border-[#4d7c0f] focus:ring-[#4d7c0f]/20 bg-white/50 text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#4d7c0f]" />
                              Mobile Number
                            </label>
                            <Input
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="h-13 rounded-xl border-[#213d4f]/10 focus:border-[#4d7c0f] focus:ring-[#4d7c0f]/20 bg-white/50 text-base"
                            />
                          </div>

                          <Button
                            onClick={() => {
                              console.log(
                                "🔘 Continue button clicked - Moving to Step 2"
                              );
                              console.log("📋 Current form data:", formData);
                              setFormStep(2);
                            }}
                            disabled={!formData.fullName || !formData.phone}
                            className="w-full h-13 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-bold rounded-xl shadow-lg shadow-[#4d7c0f]/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
                          >
                            <span>Continue</span>
                            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#4d7c0f]" />
                              Date of Birth
                            </label>
                            <Input
                              type="date"
                              value={formData.dob}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dob: e.target.value,
                                })
                              }
                              className="h-13 rounded-xl border-[#213d4f]/10 focus:border-[#4d7c0f] focus:ring-[#4d7c0f]/20 bg-white/50 text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#213d4f] flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#4d7c0f]" />
                              PAN Number
                            </label>
                            <Input
                              type="text"
                              placeholder="ABCDE1234F"
                              value={formData.pan}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  pan: e.target.value.toUpperCase(),
                                })
                              }
                              maxLength={10}
                              className="h-13 rounded-xl border-[#213d4f]/10 focus:border-[#4d7c0f] focus:ring-[#4d7c0f]/20 bg-white/50 text-base uppercase"
                            />
                            <p className="text-xs text-[#213d4f]/40">
                              Your PAN is required to fetch credit score from
                              bureaus
                            </p>
                          </div>

                          {/* Error Message */}
                          {apiError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">
                                  !
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-red-800">
                                  Error
                                </p>
                                <p className="text-xs text-red-600 mt-1">
                                  {apiError}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setFormStep(1);
                                setApiError(null);
                              }}
                              className="h-13 px-6 border-2 border-[#213d4f]/10 text-[#213d4f] hover:bg-[#f8fdf2] rounded-xl"
                            >
                              Back
                            </Button>
                            <Button
                              onClick={() => {
                                console.log(
                                  "🔘 Get My Free Score button clicked!"
                                );
                                console.log("📋 Full form data:", formData);
                                console.log("✅ Calling handleCheckScore...");
                                handleCheckScore();
                              }}
                              disabled={
                                !formData.dob ||
                                formData.pan.length !== 10 ||
                                isSubmitting
                              }
                              className="flex-1 h-13 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-bold rounded-xl shadow-lg shadow-[#4d7c0f]/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                  <svg
                                    className="animate-spin w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
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
                                  Fetching Score...
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  <Sparkles className="w-5 h-5" />
                                  Get My Free Score
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Security Note */}
                      <div className="mt-6 pt-5 border-t border-[#213d4f]/5 flex items-center gap-3">
                        <Lock className="w-4 h-4 text-[#4d7c0f]" />
                        <p className="text-xs text-[#213d4f]/50">
                          Your data is encrypted with 256-bit SSL. We never
                          share your information.
                        </p>
                      </div>
                    </div>

                    {/* Decorative */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#eefe92]/20 rounded-full blur-2xl pointer-events-none" />
                  </div>
                ) : (
                  /* Success State */
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-[#eefe92]/50 shadow-2xl shadow-[#4d7c0f]/10 p-8 sm:p-10 text-center overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4d7c0f] to-[#22c55e] rounded-full flex items-center justify-center animate-bounce-subtle">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#213d4f] mb-3">
                        Score Retrieved! 🎉
                      </h3>
                      <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#f8fdf2] to-[#eefe92]/30 rounded-2xl border border-[#4d7c0f]/20 mb-4">
                        <span className="text-sm text-[#213d4f]/60">
                          Your Credit Score
                        </span>
                        <span className="text-4xl font-black text-[#4d7c0f]">
                          {apiScore || 0}
                        </span>
                        <span
                          className="px-2 py-1 text-white text-xs font-bold rounded-full"
                          style={{
                            backgroundColor: apiScore
                              ? getScoreDetails(apiScore).color
                              : "#22c55e",
                          }}
                        >
                          {apiScore ? getScoreDetails(apiScore).label : "Good"}
                        </span>
                      </div>
                      <p className="text-[#213d4f]/60 mb-6 max-w-sm mx-auto">
                        {apiScore
                          ? getScoreDetails(apiScore).message
                          : "Loading your score details..."}
                      </p>
                      <Button
                        onClick={() => {
                          setShowSuccess(false);
                          setFormStep(1);
                          setFormData({
                            fullName: "",
                            phone: "",
                            dob: "",
                            pan: "",
                          });
                          setApiScore(null);
                          setApiError(null);
                        }}
                        variant="outline"
                        className="border-2 border-[#4d7c0f] text-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white rounded-xl"
                      >
                        Check Another Score
                      </Button>
                    </div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#eefe92]/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#22c55e]/20 rounded-full blur-3xl" />
                  </div>
                )}

                {/* Trust Badges Below Form */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#213d4f]/50">
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-[#4d7c0f]" />
                    <span>RBI Approved</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#4d7c0f]" />
                    <span>Bank-Grade Security</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#4d7c0f]" />
                    <span>Instant Results</span>
                  </div>
                </div>
              </div>

              {/* Right - Visual/Details */}
              <div
                className={`relative transition-all duration-700 delay-200 ${
                  formVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                {/* Main Visual Card */}
                <div className="relative bg-gradient-to-br from-[#213d4f] via-[#2d5a6b] to-[#213d4f] rounded-3xl p-8 sm:p-10 overflow-hidden">
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-0 -right-3 px-4 py-2 bg-[#eefe92] rounded-lg shadow-lg">
                    <span className="text-xs font-bold text-[#213d4f] flex items-center gap-1 ">
                      <Gift className="w-3.5 h-3.5" />
                      <p className="mr-2">100% FREE</p>
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#eefe92] flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-[#213d4f]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Why Check Your Score?
                        </h3>
                        <p className="text-white/60 text-sm ">
                          Knowledge is power
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        {
                          icon: Target,
                          text: "Know where you stand financially",
                          highlight: "Instant insights",
                        },
                        {
                          icon: TrendingUp,
                          text: "Get better loan interest rates",
                          highlight: "Save ₹2L+",
                        },
                        {
                          icon: Zap,
                          text: "Faster loan approvals",
                          highlight: "24-hour processing",
                        },
                        {
                          icon: Shield,
                          text: "Spot fraud or errors early",
                          highlight: "Stay protected",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#eefe92]/20 flex items-center justify-center group-hover:bg-[#eefe92]/30 transition-colors">
                            <item.icon className="w-5 h-5 text-[#eefe92]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">
                              {item.text}
                            </p>
                            <p className="text-[#eefe92] text-xs font-semibold">
                              {item.highlight}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#eefe92] group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>

                    {/* Social Proof */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex -space-x-2 mb-2">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#eefe92] to-[#4d7c0f] border-2 border-[#213d4f] flex items-center justify-center"
                              >
                                <span className="text-xs font-bold text-[#213d4f]">
                                  {["A", "R", "S", "M"][i]}
                                </span>
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#213d4f] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                +
                              </span>
                            </div>
                          </div>
                          <p className="text-white/60 text-xs">
                            <span className="text-white font-semibold">
                              3L+ people
                            </span>{" "}
                            checked their score this month
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-[#eefe92] fill-[#eefe92]"
                              />
                            ))}
                          </div>
                          <p className="text-white/60 text-xs">
                            4.9/5 from 50K+ reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glowing Orbs */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#4d7c0f]/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#eefe92]/20 rounded-full blur-3xl" />
                </div>

                {/* Bottom Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { value: "0", label: "Impact on Score", icon: Shield },
                    { value: "60s", label: "Time to Check", icon: Clock },
                    { value: "Free", label: "Forever", icon: Gift },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="relative p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#eefe92]/30 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <stat.icon className="w-5 h-5 text-[#4d7c0f] mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="text-2xl font-black text-[#213d4f]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#213d4f]/50 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#eefe92]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 -z-10" />
        </section>

        {/* Why Credit Score Matters - Enhanced Visual Section */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eefe92]/30 border border-[#4d7c0f]/20 mb-6">
                <Award className="w-4 h-4 text-[#4d7c0f]" />
                <span className="text-xs font-semibold text-[#4d7c0f] uppercase tracking-wider">
                  Why It Matters
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
                Your Credit Score is Your
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] bg-clip-text text-transparent">
                    Financial Superpower
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2"
                      stroke="#eefe92"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#213d4f]/60 max-w-2xl mx-auto">
                A good credit score isn't just a number — it's the key that
                unlocks better financial opportunities
              </p>
            </div>

            {/* Impact Cards - 3D Style */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
              {[
                {
                  icon: TrendingUp,
                  title: "Save ₹2-5 Lakhs",
                  subtitle: "In Interest Payments",
                  description:
                    "A score of 750+ can get you 2-4% lower interest rates, saving lakhs over the loan tenure",
                  gradient: "from-emerald-500 to-teal-600",
                  stat: "Up to 4%",
                  statLabel: "Lower Rates",
                },
                {
                  icon: Zap,
                  title: "24-Hour Approvals",
                  subtitle: "Instant Decisions",
                  description:
                    "Good credit scores fast-track your application. Get approved in hours, not weeks",
                  gradient: "from-blue-500 to-indigo-600",
                  stat: "10x",
                  statLabel: "Faster",
                },
                {
                  icon: Target,
                  title: "Higher Limits",
                  subtitle: "Unlock More Credit",
                  description:
                    "Qualify for larger loan amounts and premium credit cards with excellent scores",
                  gradient: "from-purple-500 to-pink-600",
                  stat: "₹50L+",
                  statLabel: "Max Loan",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#213d4f]/5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Gradient Overlay on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Icon */}
                    <div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <card.icon className="w-7 h-7 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 animate-shimmer" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#213d4f] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#4d7c0f] font-semibold mb-3">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-[#213d4f]/60 mb-6 leading-relaxed">
                      {card.description}
                    </p>

                    {/* Stat */}
                    <div className="flex items-end gap-2 pt-4 border-t border-[#213d4f]/5">
                      <span
                        className={`text-3xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                      >
                        {card.stat}
                      </span>
                      <span className="text-xs text-[#213d4f]/50 mb-1">
                        {card.statLabel}
                      </span>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Score Range Visualizer */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-[#213d4f]/5 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#eefe92]/5 to-transparent" />

              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#213d4f] mb-2 text-center">
                  Understanding Credit Score Ranges
                </h3>
                <p className="text-sm text-[#213d4f]/50 text-center mb-10">
                  Where do you stand? Check your score to find out.
                </p>

                {/* Visual Score Bar */}
                <div className="relative h-16 sm:h-20 rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Score Labels */}
                  <div className="absolute inset-0 flex">
                    {scoreRanges.map((range, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center justify-center text-white relative group cursor-pointer"
                        onMouseEnter={() => setActiveSection(i)}
                      >
                        <div
                          className={`absolute inset-0 bg-white/10 opacity-0 ${
                            activeSection === i
                              ? "opacity-100"
                              : "group-hover:opacity-50"
                          } transition-opacity`}
                        />
                        <span className="text-xs sm:text-sm font-bold relative z-10">
                          {range.label}
                        </span>
                        <span className="text-[10px] sm:text-xs opacity-80 relative z-10">
                          {range.range}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Animated Indicator */}
                  <div
                    className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-500"
                    style={{ left: `${25 + activeSection * 25}%` }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg animate-bounce-subtle" />
                  </div>
                </div>

                {/* Score Details Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {scoreRanges.map((range, i) => (
                    <div
                      key={i}
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        activeSection === i
                          ? `border-${range.color}-400 bg-${range.color}-50/50 shadow-lg scale-105`
                          : "border-transparent bg-white/50 hover:bg-white/80"
                      }`}
                      onClick={() => setActiveSection(i)}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${range.gradient} flex items-center justify-center mb-3`}
                      >
                        <span className="text-white text-xs font-bold">
                          {range.label.charAt(0)}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-[#213d4f] mb-1">
                        {range.range}
                      </div>
                      <div
                        className={`text-sm font-semibold mb-2`}
                        style={{
                          color:
                            range.color === "red"
                              ? "#ef4444"
                              : range.color === "amber"
                              ? "#f59e0b"
                              : range.color === "lime"
                              ? "#84cc16"
                              : "#22c55e",
                        }}
                      >
                        {range.label}
                      </div>
                      <p className="text-xs text-[#213d4f]/60 leading-relaxed">
                        {i === 0 &&
                          "Difficult to get approved. Focus on building credit history."}
                        {i === 1 &&
                          "Limited options with higher interest rates."}
                        {i === 2 &&
                          "Good rates available. Room for improvement."}
                        {i === 3 &&
                          "Best rates and terms. Premium card eligibility."}
                      </p>

                      {activeSection === i && (
                        <div
                          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${range.gradient} opacity-10 -z-10`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section - Interactive */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eefe92]/30 border border-[#4d7c0f]/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#4d7c0f]" />
                <span className="text-xs font-semibold text-[#4d7c0f] uppercase tracking-wider">
                  Pro Tips
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-termina font-black text-[#213d4f] mb-6">
                5 Ways to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#4d7c0f]">Boost</span>
                  <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[#eefe92] -z-0 -rotate-1"></span>
                </span>{" "}
                Your Score
              </h2>
              <p className="text-base sm:text-lg text-[#213d4f]/60 max-w-2xl mx-auto">
                Take control of your financial future with these proven
                strategies
              </p>
            </div>

            {/* Tips Cards */}
            <div className="space-y-4 sm:space-y-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl border border-[#213d4f]/5 overflow-hidden transition-all duration-500 ${
                    hoveredTip === index
                      ? "shadow-2xl scale-[1.02]"
                      : "shadow-lg hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setHoveredTip(index)}
                  onMouseLeave={() => setHoveredTip(null)}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    style={{
                      background: `linear-gradient(135deg, ${tip.color}, ${tip.color}50)`,
                    }}
                  />

                  <div className="relative p-5 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-4">
                      <div
                        className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          background: `linear-gradient(135deg, ${tip.color}20, ${tip.color}10)`,
                        }}
                      >
                        <tip.icon
                          className="w-7 h-7 sm:w-8 sm:h-8"
                          style={{ color: tip.color }}
                        />
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-sm"
                          style={{ color: tip.color }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#213d4f]">
                          {tip.title}
                        </h3>
                        <div
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ background: tip.color }}
                        >
                          {tip.impact} Impact
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-[#213d4f]/60 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#213d4f]/5 group-hover:bg-[#4d7c0f] transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-[#213d4f]/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 bg-[#213d4f]/5">
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: hoveredTip === index ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${tip.color}, ${tip.color}80)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                <Button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="h-14 px-8 bg-[#4d7c0f] hover:bg-[#3d6310] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span>Check Your Score Now</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <span className="text-sm text-[#213d4f]/40">
                  It's 100% free • No impact on score
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Floating CTA Button - Only show when form is out of view */}
        <div
          className={`lg:hidden fixed bottom-6 left-4 right-4 z-50 transition-all duration-300 ${
            showFloatingButton
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-20 pointer-events-none"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full h-14 bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-bold rounded-2xl shadow-2xl shadow-[#4d7c0f]/40 flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
          >
            {/* <Sparkles className="w-5 h-5" /> */}
            <span>Check My Score for Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}
