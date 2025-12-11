"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  TrendingDown,
  PieChart,
  ArrowRight,
  Info,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Download,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

type LoanType = "home" | "personal" | "car" | "education";

interface LoanPreset {
  name: string;
  icon: typeof Home;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  minTenure: number;
  maxTenure: number;
  defaultTenure: number;
  color: string;
}

const loanPresets: Record<LoanType, LoanPreset> = {
  home: {
    name: "Home Loan",
    icon: Home,
    minAmount: 500000,
    maxAmount: 50000000,
    defaultAmount: 5000000,
    minRate: 8.5,
    maxRate: 12,
    defaultRate: 9.5,
    minTenure: 5,
    maxTenure: 30,
    defaultTenure: 20,
    color: "#22c55e",
  },
  personal: {
    name: "Personal Loan",
    icon: Briefcase,
    minAmount: 50000,
    maxAmount: 4000000,
    defaultAmount: 500000,
    minRate: 10.5,
    maxRate: 24,
    defaultRate: 14,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 3,
    color: "#a855f7",
  },
  car: {
    name: "Car Loan",
    icon: Car,
    minAmount: 100000,
    maxAmount: 10000000,
    defaultAmount: 800000,
    minRate: 8,
    maxRate: 15,
    defaultRate: 10.5,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 5,
    color: "#3b82f6",
  },
  education: {
    name: "Education Loan",
    icon: GraduationCap,
    minAmount: 100000,
    maxAmount: 7500000,
    defaultAmount: 1000000,
    minRate: 8,
    maxRate: 14,
    defaultRate: 10,
    minTenure: 3,
    maxTenure: 15,
    defaultTenure: 7,
    color: "#f97316",
  },
};

export default function EMICalculator() {
  const [isVisible, setIsVisible] = useState(false);
  const [loanType, setLoanType] = useState<LoanType>("home");
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);
  const [isYears, setIsYears] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const preset = loanPresets[loanType];

  // Calculate EMI
  const calculateEMI = useCallback(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = isYears ? tenure * 12 : tenure;

    if (monthlyRate === 0) {
      return principal / tenureMonths;
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    return emi;
  }, [loanAmount, interestRate, tenure, isYears]);

  const emi = calculateEMI();
  const tenureMonths = isYears ? tenure * 12 : tenure;
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercentage = (loanAmount / totalPayment) * 100;
  const interestPercentage = (totalInterest / totalPayment) * 100;

  // Handle loan type change
  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    const newPreset = loanPresets[type];
    setLoanAmount(newPreset.defaultAmount);
    setInterestRate(newPreset.defaultRate);
    setTenure(newPreset.defaultTenure);
    setIsYears(true);
  };

  // Reset to defaults
  const handleReset = () => {
    setLoanAmount(preset.defaultAmount);
    setInterestRate(preset.defaultRate);
    setTenure(preset.defaultTenure);
    setIsYears(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
  };

  // Format full currency
  const formatFullCurrency = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

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

  // Calculate slider percentage for gradient
  const getSliderPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#eefe92]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <GridPattern
          width={50}
          height={50}
          x={0}
          y={0}
          squares={[
            [1, 2], [3, 4], [5, 1], [7, 3], [9, 5],
            [2, 6], [4, 8], [6, 2], [8, 7], [10, 4],
          ]}
          className="fill-[#4d7c0f]/8 stroke-[#4d7c0f]/15"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#4d7c0f]/20 rounded-full shadow-sm mb-6">
            <Calculator className="w-3.5 h-3.5 text-[#4d7c0f]" />
            <span className="text-xs font-medium text-[#213d4f]">Plan Your Finances</span>
          </div>

          {/* Headline */}
          <h2 className="font-termina text-3xl sm:text-4xl lg:text-5xl font-bold text-[#213d4f] leading-tight">
            Calculate your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">EMI</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#eefe92] -z-0 rounded"></span>
            </span>
            {" "}instantly
          </h2>

        
        </div>

        {/* Calculator Container */}
        <div
          className={`transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-[#4d7c0f]/10 shadow-xl overflow-hidden">
            {/* Loan Type Selector */}
            <div className="p-3 sm:p-4 md:p-6 border-b border-[#4d7c0f]/10 bg-gradient-to-r from-[#f8fdf2] to-white">
             
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Input Section */}
              <div className="lg:col-span-3 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                {/* Loan Amount */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#213d4f]">
                      <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4d7c0f]" />
                      Loan Amount
                    </label>
                    <div className="flex items-center gap-1 bg-[#f8fdf2] px-2 sm:px-3 py-1.5 rounded-lg border border-[#4d7c0f]/10 w-full sm:w-auto">
                      <span className="text-[#4d7c0f] font-bold text-sm">₹</span>
                      <input
                        type="text"
                        value={loanAmount.toLocaleString("en-IN")}
                        onChange={(e) => {
                          const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                          setLoanAmount(Math.min(Math.max(value, preset.minAmount), preset.maxAmount));
                        }}
                        className="w-full sm:w-28 bg-transparent text-right font-bold text-[#213d4f] text-sm sm:text-base focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={preset.minAmount}
                      max={preset.maxAmount}
                      step={preset.minAmount >= 500000 ? 100000 : 10000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, #4d7c0f ${getSliderPercentage(loanAmount, preset.minAmount, preset.maxAmount)}%, #e5e7eb ${getSliderPercentage(loanAmount, preset.minAmount, preset.maxAmount)}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#213d4f]/50">
                      <span>{formatCurrency(preset.minAmount)}</span>
                      <span>{formatCurrency(preset.maxAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#213d4f]">
                      <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4d7c0f]" />
                      Interest Rate (p.a.)
                    </label>
                    <div className="flex items-center gap-1 bg-[#f8fdf2] px-2 sm:px-3 py-1.5 rounded-lg border border-[#4d7c0f]/10 w-full sm:w-auto">
                      <input
                        type="text"
                        value={interestRate}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          setInterestRate(Math.min(Math.max(value, preset.minRate), preset.maxRate));
                        }}
                        className="w-full sm:w-16 bg-transparent text-right font-bold text-[#213d4f] text-sm sm:text-base focus:outline-none"
                      />
                      <span className="text-[#4d7c0f] font-bold text-sm">%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={preset.minRate}
                      max={preset.maxRate}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #4d7c0f ${getSliderPercentage(interestRate, preset.minRate, preset.maxRate)}%, #e5e7eb ${getSliderPercentage(interestRate, preset.minRate, preset.maxRate)}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#213d4f]/50">
                      <span>{preset.minRate}%</span>
                      <span>{preset.maxRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#213d4f]">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4d7c0f]" />
                      Loan Tenure
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex items-center gap-1 bg-[#f8fdf2] px-2 sm:px-3 py-1.5 rounded-lg border border-[#4d7c0f]/10 flex-1 sm:flex-none">
                        <input
                          type="text"
                          value={tenure}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            const maxVal = isYears ? preset.maxTenure : preset.maxTenure * 12;
                            const minVal = isYears ? preset.minTenure : preset.minTenure * 12;
                            setTenure(Math.min(Math.max(value, minVal), maxVal));
                          }}
                          className="w-full sm:w-12 bg-transparent text-right font-bold text-[#213d4f] text-sm sm:text-base focus:outline-none"
                        />
                      </div>
                      <div className="flex rounded-lg border border-[#4d7c0f]/10 overflow-hidden">
                        <button
                          onClick={() => {
                            if (!isYears) {
                              setTenure(Math.round(tenure / 12));
                              setIsYears(true);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                            isYears
                              ? "bg-[#4d7c0f] text-white"
                              : "bg-white text-[#213d4f]/60 hover:bg-[#f8fdf2]"
                          }`}
                        >
                          Yr
                        </button>
                        <button
                          onClick={() => {
                            if (isYears) {
                              setTenure(tenure * 12);
                              setIsYears(false);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                            !isYears
                              ? "bg-[#4d7c0f] text-white"
                              : "bg-white text-[#213d4f]/60 hover:bg-[#f8fdf2]"
                          }`}
                        >
                          Mo
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={isYears ? preset.minTenure : preset.minTenure * 12}
                      max={isYears ? preset.maxTenure : preset.maxTenure * 12}
                      step={1}
                      value={tenure}
                      onChange={(e) => setTenure(parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #4d7c0f ${getSliderPercentage(
                          tenure,
                          isYears ? preset.minTenure : preset.minTenure * 12,
                          isYears ? preset.maxTenure : preset.maxTenure * 12
                        )}%, #e5e7eb ${getSliderPercentage(
                          tenure,
                          isYears ? preset.minTenure : preset.minTenure * 12,
                          isYears ? preset.maxTenure : preset.maxTenure * 12
                        )}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-[#213d4f]/50">
                      <span>{isYears ? preset.minTenure : preset.minTenure * 12} {isYears ? "Yr" : "Mo"}</span>
                      <span>{isYears ? preset.maxTenure : preset.maxTenure * 12} {isYears ? "Yr" : "Mo"}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-[#4d7c0f] hover:text-[#3d6310] transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset to defaults
                </button>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#213d4f] to-[#1a3040] p-4 sm:p-6 md:p-8 text-white">
                {/* EMI Display */}
                <div className="text-center mb-6 sm:mb-8">
                  <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">Your Monthly EMI</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[#eefe92] text-xl sm:text-2xl">₹</span>
                    <span className="font-termina text-3xl sm:text-4xl md:text-5xl font-bold">
                      {Math.round(emi).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-white/40 text-[10px] sm:text-xs mt-1 sm:mt-2">per month for {tenureMonths} months</p>
                </div>

                {/* Pie Chart Visual */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-6 sm:mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    {/* Interest portion */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="12"
                      strokeDasharray={`${interestPercentage * 2.51} ${251.2 - interestPercentage * 2.51}`}
                      strokeDashoffset="0"
                      className="transition-all duration-700"
                    />
                    {/* Principal portion */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#eefe92"
                      strokeWidth="12"
                      strokeDasharray={`${principalPercentage * 2.51} ${251.2 - principalPercentage * 2.51}`}
                      strokeDashoffset={`-${interestPercentage * 2.51}`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-6 h-6 text-white/40 mx-auto mb-1" />
                      <p className="text-xs text-white/40">Breakdown</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#eefe92]"></div>
                      <span className="text-xs sm:text-sm text-white/70">Principal</span>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm">{formatFullCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f97316]"></div>
                      <span className="text-xs sm:text-sm text-white/70">Interest</span>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm">{formatFullCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#eefe92]/10 border border-[#eefe92]/20">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-white">Total Payment</span>
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-[#eefe92]">{formatFullCurrency(totalPayment)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full bg-[#eefe92] hover:bg-[#e0f080] text-[#213d4f] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group">
                  <span>Apply for This Loan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Info Bar */}
            <div className="p-3 sm:p-4 md:p-6 bg-[#f8fdf2] border-t border-[#4d7c0f]/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 text-[10px] sm:text-xs md:text-sm text-[#213d4f]/60">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4d7c0f] flex-shrink-0" />
                  <span>EMI calculated using reducing balance method</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4d7c0f] flex-shrink-0" />
                  <span>Rates starting from {preset.minRate}% p.a.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Custom slider styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #4d7c0f;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(77, 124, 15, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #4d7c0f;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        
        input[type="range"]:focus {
          outline: none;
        }
        
        input[type="range"]::-webkit-slider-runnable-track {
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
}
