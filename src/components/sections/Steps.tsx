"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Fingerprint,
  BarChart2,
  FileCheck,
  Banknote,
  Shield,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      number: "01",
      title: "Verify Your Identity",
      description:
        "Quick KYC verification. Zero paperwork required.",
      icon: Fingerprint,
      stat: "30 sec",
      statLabel: "verification",
    },
    {
      number: "02",
      title: "AI Credit Analysis",
      description:
        "Our AI analyzes 50+ data points to find loans that match your profile perfectly.",
      icon: BarChart2,
      stat: "98%",
      statLabel: "accuracy",
    },
    {
      number: "03",
      title: "Compare and Choose",
      description:
        "Browse offers from 30+ lenders. Transparent rates, no hidden fees.",
      icon: FileCheck,
      stat: "30+",
      statLabel: "lenders",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 "
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#eefe92]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <GridPattern
          width={50}
          height={50}
          x={0}
          y={0}
          squares={[
            [2, 1], [4, 3], [6, 2], [3, 5], [5, 7],
            [8, 3], [9, 5], [7, 8], [10, 6], [11, 9],
          ]}
          className="fill-[#4d7c0f]/8 stroke-[#4d7c0f]/15"
        />
      </div>

      <style jsx>{`
        @keyframes pulse-highlight {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(77, 124, 15, 0.2);
          }
          50% {
            box-shadow: 0 0 20px 8px rgba(77, 124, 15, 0.3);
          }
        }
        
        .highlight-pulse {
          animation: pulse-highlight 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:-mt-44  ">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#4d7c0f]/20 rounded-full shadow-sm mb-6">
            <Zap className="w-3.5 h-3.5 text-[#4d7c0f]" />
            <span className="text-xs font-medium text-[#213d4f]">How it works</span>
          </div>

          {/* Headline */}
          <h2 className="font-termina text-3xl sm:text-4xl lg:text-5xl font-bold text-[#213d4f] leading-tight">
            From application to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">funds</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#eefe92] -z-0 rounded"></span>
            </span>
            <br className="hidden sm:block" />
            in just <span className="text-[#ff0077]" >  twentyfour </span> 
             hours
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#213d4f]/60 max-w-xl mx-auto">
            Our AI-powered platform makes getting a loan simple, fast, and completely transparent.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-3">
          {/* Step Cards */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div
                  className={`relative h-full p-6 rounded-2xl border transition-all duration-300 bg-white/60 backdrop-blur-sm ${
                    isActive
                      ? "border-[#4d7c0f]/30 shadow-lg shadow-[#4d7c0f]/10 highlight-pulse"
                      : "border-[#4d7c0f]/10 hover:border-[#4d7c0f]/20 hover:shadow-md"
                  }`}
                >
                  {/* Number */}
                  <div
                    className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                      isActive ? "text-[#4d7c0f]" : "text-[#213d4f]/10"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#eefe92] shadow-md"
                        : "bg-[#f8fdf2] border border-[#4d7c0f]/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? "text-[#213d4f]" : "text-[#4d7c0f]/60"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-termina text-lg font-bold text-[#213d4f] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#213d4f]/60 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Stat */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#4d7c0f]/10">
                    <span
                      className={`text-xl font-bold transition-colors duration-300 ${
                        isActive ? "text-[#4d7c0f]" : "text-[#213d4f]/40"
                      }`}
                    >
                      {step.stat}
                    </span>
                    <span className="text-xs text-[#213d4f]/40 uppercase tracking-wider">
                      {step.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative h-full p-6 rounded-2xl bg-[#eefe92] border border-[#4d7c0f]/20 shadow-lg">
              {/* Icons */}
              <div className="flex items-center gap-1 mb-4 ">
                <div className="w-10 h-10 rounded-lg bg-[#213d4f]/10 flex items-center justify-center mr-1">
                  <Banknote className="w-5 h-5 text-[#213d4f]" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#213d4f]/10 flex items-center justify-center ">
                  <Shield className="w-4 h-4 text-[#213d4f]" />
                </div>
                <div className="w-6 h-6 rounded-lg bg-[#213d4f]/10 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-[#213d4f]" />
                </div>
              </div>

              <h3 className="font-termina text-xl font-bold text-[#213d4f] mb-2">
                Get Funded
              </h3>

              <p className="text-sm text-[#213d4f]/70 leading-relaxed mb-6">
                Instant approval. Funds in your account within 24 hours. No branch visits needed.
              </p>

              {/* CTA Button */}
              <Button className="w-full bg-[#213d4f] hover:bg-[#1a3040] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group">
                <span>Start Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        {/* <div
          className={`mt-12 flex flex-wrap justify-center items-center gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { icon: Shield, text: "Bank-grade security" },
            { icon: Clock, text: "24/7 processing" },
            { icon: Zap, text: "Instant decisions" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-[#213d4f]/50 text-sm"
            >
              <item.icon className="w-4 h-4 text-[#4d7c0f]/60" />
              <span>{item.text}</span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}