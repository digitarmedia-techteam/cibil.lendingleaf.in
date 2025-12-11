"use client";
import React, { useEffect, useRef, useState } from "react";
import { CreditCard, Home, User, Heart, Shield, Star, ArrowRight, Sparkles, TrendingUp, Clock, CheckCircle2, Zap } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";

function ServicesSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "services-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes services-float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-4px) rotate(2deg); }
        50% { transform: translateY(-8px) rotate(0deg); }
        75% { transform: translateY(-4px) rotate(-2deg); }
      }
      @keyframes services-pulse {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.1); filter: brightness(1.2); }
      }
      @keyframes services-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(77, 124, 15, 0.1); }
        50% { box-shadow: 0 0 40px rgba(77, 124, 15, 0.3); }
      }
      @keyframes services-intro {
        0% { opacity: 0; transform: translate3d(0, 40px, 0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      @keyframes services-card {
        0% { opacity: 0; transform: translate3d(0, 30px, 0) scale(0.95); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes border-dance {
        0%, 100% { border-color: rgba(77, 124, 15, 0.1); }
        50% { border-color: rgba(77, 124, 15, 0.3); }
      }
      @keyframes icon-bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.05); }
      }
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
      }
      @keyframes line-draw {
        0% { stroke-dashoffset: 100; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes badge-pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 15px rgba(77, 124, 15, 0.3); }
        50% { transform: scale(1.05); box-shadow: 0 6px 25px rgba(77, 124, 15, 0.5); }
      }
      @keyframes float-particle {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        25% { opacity: 1; }
        50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 0.8; }
        75% { opacity: 0.5; }
        100% { transform: translateY(-40px) translateX(-5px) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Credit Score Check",
      tagline: "Know Your Worth",
      description: "Get your free credit score in 60 seconds. No impact on your credit rating.",
      features: ["Free forever", "Instant results", "Improvement tips"],
      icon: CreditCard,
      subIcon: TrendingUp,
      recommended: true,
      popular: true,
      animation: "services-float 4s ease-in-out infinite",
      gradient: "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
      lightGradient: "from-blue-50 to-blue-100/50",
      accentColor: "#3b82f6",
      stats: "2M+ checks",
    },
    {
      title: "Personal Loan",
      tagline: "Freedom at Your Fingertips",
      description: "Flexible personal loans for your immediate needs. No collateral required.",
      features: ["Flexible terms", "Quick disbursal", "Minimal docs"],
      icon: User,
      subIcon: Zap,
      recommended: false,
      popular: true,
      animation: "services-float 6s ease-in-out infinite",
      gradient: "from-[#a855f7] via-[#9333ea] to-[#7e22ce]",
      lightGradient: "from-purple-50 to-purple-100/50",
      accentColor: "#a855f7",
      stats: "24hr disbursal",
    },
    {
      title: "Home Loan",
      tagline: "Your Dream Home Awaits",
      description: "Competitive rates for your dream home. Pre-approval in minutes.",
      features: ["Lowest rates", "Quick approval", "Expert guidance"],
      icon: Home,
      subIcon: Clock,
      recommended: false,
      popular: false,
      animation: "services-pulse 5s ease-in-out infinite",
      gradient: "from-[#22c55e] via-[#16a34a] to-[#15803d]",
      lightGradient: "from-green-50 to-green-100/50",
      accentColor: "#22c55e",
      stats: "₹500Cr+ disbursed",
    },
    {
      title: "Health Insurance",
      tagline: "Protection That Cares",
      description: "Comprehensive health coverage for you and your family.",
      features: ["Wide network", "Cashless claims", "Family coverage"],
      icon: Heart,
      subIcon: CheckCircle2,
      recommended: true,
      popular: false,
      animation: "services-pulse 4.5s ease-in-out infinite",
      gradient: "from-[#f43f5e] via-[#e11d48] to-[#be123c]",
      lightGradient: "from-rose-50 to-rose-100/50",
      accentColor: "#f43f5e",
      stats: "10K+ claims settled",
    },
    {
      title: "Life Insurance",
      tagline: "Secure Tomorrow, Today",
      description: "Secure your family's future with our term and investment plans.",
      features: ["High coverage", "Tax benefits", "Easy claims"],
      icon: Shield,
      subIcon: Sparkles,
      recommended: false,
      popular: false,
      animation: "services-float 5.5s ease-in-out infinite",
      gradient: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
      lightGradient: "from-orange-50 to-orange-100/50",
      accentColor: "#f97316",
      stats: "₹100Cr+ coverage",
    },
  ];

  const spans = [
    "md:col-span-2 md:row-span-1", // Credit Score
    "md:col-span-2 md:row-span-1", // Personal Loan
    "md:col-span-2 md:row-span-1", // Home Loan
    "md:col-span-3 md:row-span-1", // Health Insurance
    "md:col-span-3 md:row-span-1", // Life Insurance
  ];

  return (
    <div className="relative min-h-screen w-full text-[#213d4f]">
      {/* Subtle animated background blobs - exact match to Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#eefe92]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern - exact match to Hero */}
      <div className="pointer-events-none absolute inset-0  opacity-40">
        <GridPattern
          width={50}
          height={50}
          x={0}
          y={0}
          squares={[
            [1, 1], [3, 2], [5, 3], [2, 5], [4, 6],
            [7, 2], [8, 4], [6, 7], [9, 5], [10, 8],
            [12, 3], [14, 6], [11, 9], [15, 7], [13, 10]
          ]}
          className="fill-[#4d7c0f]/8 stroke-[#4d7c0f]/15"
        />
      </div>

      <section
        ref={sectionRef}
        className={`relative mx-auto max-w-6xl px-6 py-24 motion-safe:opacity-0 ${
          sectionVisible ? "motion-safe:animate-[services-intro_0.9s_ease-out_forwards]" : ""
        }`}
      >
        {/* Section Header - Enhanced */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eefe92]/30 border border-[#4d7c0f]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#4d7c0f] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#4d7c0f] font-semibold">
              Our Services
            </span>
          </div>
          <h2 className="font-termina text-4xl md:text-6xl font-black tracking-tight text-[#213d4f] mb-6">
            Financial Solutions
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Built for You</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#eefe92] -z-0 rounded-sm" />
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#213d4f]/60 leading-relaxed">
            From credit scores to insurance — comprehensive financial tools designed to empower your journey
          </p>
        </header>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:auto-rows-[minmax(180px,auto)] md:grid-cols-6">
          {services.map((service, index) => (
            <ServiceItem
              key={service.title}
              span={spans[index]}
              service={service}
              index={index}
              isVisible={sectionVisible}
              isHovered={hoveredCard === index}
              onHover={() => setHoveredCard(index)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Footer Stats */}
        {/* <footer className="mt-5 pt-10 border-t border-[#213d4f]/10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center group cursor-default">
              <div className="text-3xl md:text-4xl font-black text-[#213d4f] group-hover:text-[#4d7c0f] transition-colors">50K+</div>
              <div className="text-xs uppercase tracking-widest text-[#213d4f]/50 mt-1">Happy Customers</div>
            </div>
            <div className="h-10 w-px bg-[#213d4f]/10 hidden md:block" />
            <div className="text-center group cursor-default">
              <div className="text-3xl md:text-4xl font-black text-[#213d4f] group-hover:text-[#4d7c0f] transition-colors">₹500Cr+</div>
              <div className="text-xs uppercase tracking-widest text-[#213d4f]/50 mt-1">Loans Disbursed</div>
            </div>
            <div className="h-10 w-px bg-[#213d4f]/10 hidden md:block" />
            <div className="text-center group cursor-default">
              <div className="text-3xl md:text-4xl font-black text-[#213d4f] group-hover:text-[#4d7c0f] transition-colors">4.9★</div>
              <div className="text-xs uppercase tracking-widest text-[#213d4f]/50 mt-1">User Rating</div>
            </div>
          </div>
        </footer> */}
      </section>
    </div>
  );
}

function ServiceItem({ service, span = "", index = 0, isVisible = false, isHovered = false, onHover, onLeave }: { 
  service: { 
    icon: React.ElementType; 
    subIcon: React.ElementType;
    animation: string; 
    title: string; 
    tagline: string;
    description: string; 
    features: string[];
    recommended: boolean;
    popular: boolean;
    gradient: string;
    lightGradient: string;
    accentColor: string;
    stats: string;
  }; 
  span?: string; 
  index?: number; 
  isVisible?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}) {
  const { icon: Icon, subIcon: SubIcon, animation, title, tagline, description, features, recommended, popular, gradient, lightGradient, accentColor, stats } = service;
  const animationDelay = `${Math.max(index * 0.15, 0)}s`;
  const isLarge = span.includes("row-span-2");

  return (
    <article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 transition-all duration-500 ease-out motion-safe:opacity-0 cursor-pointer ${
        isVisible ? "motion-safe:animate-[services-card_0.8s_ease-out_forwards]" : ""
      } ${span} ${
        isHovered 
          ? "border-[#4d7c0f]/40 -translate-y-2 shadow-[0_30px_80px_-20px_rgba(33,61,79,0.2)]" 
          : "border-[#213d4f]/10 shadow-[0_10px_40px_rgba(33,61,79,0.04)]"
      }`}
      style={{ animationDelay }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        {/* Base gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${lightGradient} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
        
        {/* Animated gradient orb */}
        <div 
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-150 opacity-40' : 'scale-100 opacity-20'}`}
          style={{ background: `linear-gradient(135deg, ${accentColor}40, transparent)` }}
        />
        
        {/* Shimmer effect */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none' }}
          />
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#eefe92] animate-[float-particle_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#4d7c0f]/50 animate-[float-particle_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#22c55e]/50 animate-[float-particle_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>

      {/* Recommended Badge - Enhanced */}
      {recommended && (
        <div className="absolute -top-1 -right-1 z-20">
          <div 
            className="flex items-center gap-1.5 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
              animation: 'badge-pulse 2s ease-in-out infinite'
            }}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Recommended
          </div>
        </div>
      )}


      {/* Card Content */}
      <div className={`relative z-10 flex flex-col h-full p-6 ${isLarge ? 'md:p-8' : ''}`}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon Container - Enhanced */}
          <div className="relative">
            <div 
              className={`relative flex items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
              } ${isLarge ? 'h-16 w-16' : 'h-14 w-14'}`}
              style={{ 
                borderColor: `${accentColor}30`,
                background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
                boxShadow: isHovered ? `0 10px 30px ${accentColor}30` : 'none'
              }}
            >
              <Icon
                className={`transition-all duration-500 ${isLarge ? 'h-8 w-8' : 'h-7 w-7'} ${isHovered ? 'scale-110' : 'scale-100'}`}
                style={{ color: accentColor, animation }}
                strokeWidth={1.8}
              />
              
              {/* Sub icon */}
              <div 
                className={`absolute -bottom-1 -right-1 rounded-full p-1 transition-all duration-300 ${isHovered ? 'scale-110 opacity-100' : 'scale-90 opacity-70'}`}
                style={{ background: accentColor }}
              >
                <SubIcon className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Glow ring on hover */}
            {isHovered && (
              <div 
                className="absolute inset-0 rounded-2xl animate-ping"
                style={{ 
                  boxShadow: `0 0 20px ${accentColor}40`,
                  animationDuration: '1.5s'
                }}
              />
            )}
          </div>

          {/* Title & Tagline */}
          <div className="flex-1 min-w-0">
            <p 
              className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 transition-colors duration-300"
              style={{ color: accentColor }}
            >
              {tagline}
            </p>
            <h3 className={`font-bold text-[#213d4f] leading-tight transition-all duration-300 ${isLarge ? 'text-xl' : 'text-lg'} ${isHovered ? 'text-[#213d4f]' : ''}`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className={`text-[#213d4f]/60 leading-relaxed mb-4 transition-colors duration-300 ${isLarge ? 'text-sm' : 'text-xs'} ${isHovered ? 'text-[#213d4f]/70' : ''}`}>
          {description}
        </p>

        {/* Features - Enhanced */}
        <ul className={`space-y-2 flex-grow ${isLarge ? 'mb-6' : 'mb-4'}`}>
          {features.map((feature, idx) => (
            <li 
              key={idx} 
              className={`flex items-center gap-2 text-[#213d4f]/70 transition-all duration-300 ${isLarge ? 'text-sm' : 'text-xs'}`}
              style={{ 
                transitionDelay: `${idx * 50}ms`,
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
              }}
            >
              <div 
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ 
                  background: isHovered ? `${accentColor}20` : 'transparent',
                  border: `1.5px solid ${accentColor}40`
                }}
              >
                <CheckCircle2 className="w-3 h-3" style={{ color: accentColor }} />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Stats badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
            style={{ 
              background: `${accentColor}10`,
              color: accentColor
            }}
          >
            <Sparkles className="w-3 h-3" />
            {stats}
          </div>
        </div>

        {/* CTA Button - Enhanced */}
        <div className="mt-auto">
          <Button 
            onClick={() => {
              const routes: { [key: string]: string } = {
                "Credit Score Check": "/credit-score",
                "Personal Loan": "/loans/personal",
                "Home Loan": "/loans/home",
              };
              const route = routes[title];
              if (route) {
                window.location.href = route;
              }
            }}
            className={`w-full rounded-xl font-semibold transition-all duration-500 group/btn overflow-hidden relative ${isLarge ? 'h-12' : 'h-10'}`}
            style={{
              background: isHovered ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` : 'transparent',
              color: isHovered ? 'white' : accentColor,
              border: `2px solid ${accentColor}${isHovered ? '' : '40'}`,
              boxShadow: isHovered ? `0 10px 30px ${accentColor}30` : 'none'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </Button>
        </div>
      </div>

      {/* Decorative corner lines */}
      <svg className="absolute top-0 left-0 w-16 h-16 opacity-20 pointer-events-none" viewBox="0 0 60 60">
        <path 
          d="M 0 20 L 0 0 L 20 0" 
          fill="none" 
          stroke={accentColor}
          strokeWidth="2"
          className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
          style={{ 
            strokeDasharray: '100',
            strokeDashoffset: isHovered ? '0' : '100',
            transition: 'stroke-dashoffset 0.8s ease-out'
          }}
        />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 opacity-20 pointer-events-none rotate-180" viewBox="0 0 60 60">
        <path 
          d="M 0 20 L 0 0 L 20 0" 
          fill="none" 
          stroke={accentColor}
          strokeWidth="2"
          className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
          style={{ 
            strokeDasharray: '100',
            strokeDashoffset: isHovered ? '0' : '100',
            transition: 'stroke-dashoffset 0.8s ease-out'
          }}
        />
      </svg>
    </article>
  );
}

export default ServicesSection;
export { ServicesSection };

