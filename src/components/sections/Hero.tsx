"use client";

import React from "react";
import Image from "next/image";
import HeroImage from "../../images/Hero_Image.png";
import { GridPattern } from "@/components/ui/grid-pattern";
import CreditScoreCard from "../blocks/AccentCard";
import { CheckCircle2, Zap } from "lucide-react";
import LogoCloud from "../blocks/LogoCloud";

const Hero = () => {
  return (
    <section className="min-h-[100dvh] relative overflow-hidden">
      {/* Subtle animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#eefe92]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
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
        {/* Top vignette - makes grid fade from behind navbar */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent" />
      </div>

      <div className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 relative z-10 lg:order-reverse">
        {/* Left Column */}
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 pt-20 pb-8 sm:pt-24 sm:pb-12 lg:py-0 lg:order-last">
          {/* Trust Badge */}
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#4d7c0f]/20 rounded-full w-fit shadow-sm ">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4d7c0f]"></span>
            </span>
            <span className="text-xs font-medium text-[#213d4f]">50,000+ credit checks this month</span>
          </div> */}

          {/* Main Headline */}
          <h1 className="font-termina lg:mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-[#213d4f] leading-[1.15] tracking-tight mt-4 sm:mt-6">
            Know your score.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Unlock</span>
              <span className="absolute bottom-0.5 sm:bottom-1 left-0 w-full h-2 sm:h-3 bg-[#eefe92] -z-0 rounded"></span>
            </span>{" "}
            <span className="text-[#82c200]">better 
                <span className="text-2xl sm:text-3xl md:text-4xl ml-2 sm:ml-3">₹</span>
                 ates.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#213d4f]/60 max-w-md leading-relaxed">
            Check your credit score in 60 seconds - free, secure, and with zero impact on your score.
          </p>

          {/* Credit Score Card */}
          <div className="mt-6 sm:mt-8">
            <CreditScoreCard />
          </div>
          <div className="mt-6 sm:mt-8">
            <LogoCloud/>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-xs text-[#213d4f]/50">
              <svg className="w-4 h-4 text-[#4d7c0f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#213d4f]/50">
              <svg className="w-4 h-4 text-[#4d7c0f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit impact</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#213d4f]/50">
              <svg className="w-4 h-4 text-[#4d7c0f]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Results in 60 sec</span>
            </div>
          </div> */}
        </div>

        {/* Right Column - Hero Image */}
        <div className="hidden lg:flex items-end justify-start relative lg:order-first">
          {/* Decorative circles behind image */}
          <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-[#eefe92]/40 rounded-full" />
          <div className="absolute bottom-32 right-32 w-48 h-48 border-2 border-[#4d7c0f]/10 rounded-full" />
          
          <Image
            src={HeroImage}
            alt="Financial growth illustration"
            className="w-full h-auto object-contain object-left-bottom max-h-[90vh] drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Mobile: Show image */}
      <div className="lg:hidden flex items-center justify-center relative z-10 px-4 sm:px-6 pb-12 sm:pb-16">
        <Image
          src={HeroImage}
          alt="Financial growth illustration"
          className="w-full max-w-[280px] sm:max-w-sm h-auto object-contain drop-shadow-xl"
          priority
        />
      </div>

    </section>
  );
};

export default Hero;
