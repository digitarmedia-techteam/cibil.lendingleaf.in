"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Phone,
  Mail,
  Briefcase,
  IndianRupee,
  MapPin,
  Home,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Shield,
  Zap,
  PartyPopper,
} from "lucide-react";

type LoanType = "personal" | "home";

interface LoanApplicationFormProps {
  loanType: LoanType;
}

export default function LoanApplicationForm({ loanType }: LoanApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    employmentType: "",
    loanAmount: loanType === "home" ? 3000000 : 300000,
    monthlyIncome: 50000,
    purpose: "",
    city: "",
    pincode: "",
  });

  const isPersonal = loanType === "personal";
  const themeColor = isPersonal ? "#a855f7" : "#22c55e";
  const themeGradient = isPersonal 
    ? "from-purple-500 to-pink-500" 
    : "from-emerald-500 to-teal-500";
  const themeLightBg = isPersonal ? "bg-purple-50" : "bg-emerald-50";
  const themeText = isPersonal ? "text-purple-600" : "text-emerald-600";

  const employmentTypes = ["Salaried", "Self-Employed", "Business Owner"];
  const personalLoanPurposes = [
    "Medical Emergency",
    "Wedding",
    "Travel",
    "Education",
    "Debt Consolidation",
    "Home Renovation",
    "Other",
  ];
  const propertyTypes = [
    "Residential Apartment",
    "Independent House",
    "Villa",
    "Plot/Land",
    "Commercial Property",
  ];
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Other",
  ];

  const minAmount = loanType === "home" ? 500000 : 50000;
  const maxAmount = loanType === "home" ? 50000000 : 4000000;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStep1Valid = formData.name.length >= 2 && formData.phone.length === 10 && formData.email.includes("@") && formData.employmentType !== "";
  const isStep2Valid = formData.loanAmount >= minAmount && formData.monthlyIncome >= 10000 && formData.purpose !== "";
  const isStep3Valid = formData.city !== "" && formData.pincode.length === 6;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setDirection("next");
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      setDirection("next");
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection("back");
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDirection("next");
      setStep(4);
    }, 2000);
  };

  const getSliderPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    let filled = 0;
    let total = 9;
    if (formData.name.length >= 2) filled++;
    if (formData.phone.length === 10) filled++;
    if (formData.email.includes("@")) filled++;
    if (formData.employmentType) filled++;
    if (formData.loanAmount >= minAmount) filled++;
    if (formData.monthlyIncome >= 10000) filled++;
    if (formData.purpose) filled++;
    if (formData.city) filled++;
    if (formData.pincode.length === 6) filled++;
    return Math.round((filled / total) * 100);
  };

  const stepLabels = ["Personal Info", "Loan Details", "Location"];

  return (
    <div className="w-full max-w-[520px]">
      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes form-slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes form-slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes form-scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes success-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
        }
        @keyframes shimmer-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .form-step-enter {
          animation: form-slide-in-right 0.4s ease-out forwards;
        }
        .form-step-enter-back {
          animation: form-slide-in-left 0.4s ease-out forwards;
        }
        .form-scale-in {
          animation: form-scale-in 0.4s ease-out forwards;
        }
        .success-bounce {
          animation: success-bounce 0.6s ease-out;
        }
        .shimmer-sweep {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer-sweep 2s infinite;
        }
        .pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        /* Custom Slider Styles */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          background: ${themeColor};
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          background: ${themeColor};
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="relative bg-white/95 backdrop-blur-xl border border-[#213d4f]/8 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_-15px_rgba(33,61,79,0.2)] overflow-hidden">
        {/* Animated Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#213d4f]/5">
          <div
            className={`h-full bg-gradient-to-r ${themeGradient} transition-all duration-700 ease-out relative overflow-hidden`}
            style={{ width: `${(step / 4) * 100}%` }}
          >
            <div className="absolute inset-0 shimmer-sweep" />
          </div>
        </div>

        <div className="p-5 sm:p-7 md:p-8 pt-7 sm:pt-9">
          {/* Step Indicators with Labels */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-0 sm:gap-2 mb-3">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex items-center ${s < 3 ? "flex-1" : ""}`}>
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          s < step
                            ? `bg-gradient-to-br ${themeGradient} text-white shadow-lg`
                            : s === step
                            ? `${themeLightBg} ${themeText} ring-2 ring-offset-2`
                            : "bg-[#213d4f]/5 text-[#213d4f]/30"
                        }`}
                        style={{ 
                          '--tw-ring-color': s === step ? themeColor : undefined 
                        } as React.CSSProperties}
                      >
                        {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                      </div>
                      {s === step && (
                        <div 
                          className="absolute inset-0 rounded-full pulse-ring"
                          style={{ borderColor: themeColor, borderWidth: 2 }}
                        />
                      )}
                    </div>
                    {s < 3 && (
                      <div className="flex-1 h-1 mx-2 sm:mx-3 rounded-full bg-[#213d4f]/5 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${themeGradient} transition-all duration-500 rounded-full`}
                          style={{ width: s < step ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-1">
                {stepLabels.map((label, i) => (
                  <span 
                    key={i} 
                    className={`text-[10px] sm:text-xs font-medium transition-colors ${
                      i + 1 === step ? themeText : "text-[#213d4f]/40"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className={`space-y-5 ${direction === "next" ? "form-step-enter" : "form-step-enter-back"}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${themeLightBg} ${themeText} text-xs font-medium mb-3`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    Step 1 of 3
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#213d4f]">Tell us about yourself</h3>
                  <p className="text-xs text-[#213d4f]/50 mt-1">Your personal details are safe with us</p>
                </div>

                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? themeText : 'text-[#213d4f]/30'}`} />
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-13 sm:h-14 border-2 rounded-xl text-base transition-all duration-300 focus:shadow-lg ${
                      focusedField === 'name' ? `border-[${themeColor}]` : 'border-[#213d4f]/10'
                    }`}
                    style={{ borderColor: focusedField === 'name' ? themeColor : undefined }}
                  />
                  {formData.name.length >= 2 && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 form-scale-in" />
                  )}
                </div>

                <div className="relative group">
                  <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'phone' ? themeText : 'text-[#213d4f]/30'}`} />
                  <Input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="pl-12 h-13 sm:h-14 border-2 rounded-xl text-base transition-all duration-300 focus:shadow-lg"
                    style={{ borderColor: focusedField === 'phone' ? themeColor : undefined }}
                  />
                  {formData.phone.length === 10 && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 form-scale-in" />
                  )}
                </div>

                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? themeText : 'text-[#213d4f]/30'}`} />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="pl-12 h-13 sm:h-14 border-2 rounded-xl text-base transition-all duration-300 focus:shadow-lg"
                    style={{ borderColor: focusedField === 'email' ? themeColor : undefined }}
                  />
                  {formData.email.includes("@") && formData.email.includes(".") && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 form-scale-in" />
                  )}
                </div>

                <div>
                  <label className="text-xs text-[#213d4f]/60 mb-3 block font-medium">Employment Type</label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {employmentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange("employmentType", type)}
                        className={`relative py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden ${
                          formData.employmentType === type
                            ? "text-white shadow-lg scale-[1.02]"
                            : `${themeLightBg} text-[#213d4f]/70 hover:scale-[1.02]`
                        }`}
                        style={{
                          background: formData.employmentType === type 
                            ? `linear-gradient(135deg, ${themeColor}, ${isPersonal ? '#ec4899' : '#14b8a6'})` 
                            : undefined
                        }}
                      >
                        {type}
                        {formData.employmentType === type && (
                          <div className="absolute inset-0 shimmer-sweep" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Loan Details */}
            {step === 2 && (
              <div className={`space-y-6 ${direction === "next" ? "form-step-enter" : "form-step-enter-back"}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${themeLightBg} ${themeText} text-xs font-medium mb-3`}>
                    <IndianRupee className="w-3.5 h-3.5" />
                    Step 2 of 3
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#213d4f]">Your Loan Requirements</h3>
                  <p className="text-xs text-[#213d4f]/50 mt-1">Tell us what you need</p>
                </div>

                {/* Loan Amount Slider - Enhanced */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#f8fdf2] border border-[#213d4f]/5">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm text-[#213d4f]/70 font-medium flex items-center gap-2">
                      <IndianRupee className="w-4 h-4" />
                      Loan Amount
                    </label>
                    <span 
                      className="text-lg sm:text-xl font-black"
                      style={{ color: themeColor }}
                    >
                      {formatCurrency(formData.loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={loanType === "home" ? 100000 : 10000}
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, ${themeColor} ${getSliderPercentage(formData.loanAmount, minAmount, maxAmount)}%, #e5e7eb ${getSliderPercentage(formData.loanAmount, minAmount, maxAmount)}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-[#213d4f]/40">
                    <span>{formatCurrency(minAmount)}</span>
                    <span>{formatCurrency(maxAmount)}</span>
                  </div>
                </div>

                {/* Purpose/Property Type */}
                <div>
                  <label className="text-sm text-[#213d4f]/70 mb-3 block font-medium">
                    {loanType === "home" ? "Property Type" : "Loan Purpose"}
                  </label>
                  <div className="relative">
                    <select
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      className="w-full h-13 sm:h-14 px-4 border-2 border-[#213d4f]/10 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 outline-none appearance-none cursor-pointer transition-all"
                      style={{ 
                        borderColor: formData.purpose ? themeColor : undefined,
                        '--tw-ring-color': themeColor 
                      } as React.CSSProperties}
                    >
                      <option value="">Select {loanType === "home" ? "property type" : "purpose"}</option>
                      {(loanType === "home" ? propertyTypes : personalLoanPurposes).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#213d4f]/30 rotate-90" />
                  </div>
                </div>

                {/* Monthly Income Slider - Enhanced */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#f8fdf2] border border-[#213d4f]/5">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm text-[#213d4f]/70 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Monthly Income
                    </label>
                    <span 
                      className="text-lg sm:text-xl font-black"
                      style={{ color: themeColor }}
                    >
                      {formatCurrency(formData.monthlyIncome)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, ${themeColor} ${getSliderPercentage(formData.monthlyIncome, 10000, 500000)}%, #e5e7eb ${getSliderPercentage(formData.monthlyIncome, 10000, 500000)}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-[#213d4f]/40">
                    <span>₹10K</span>
                    <span>₹5L</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className={`space-y-5 ${direction === "next" ? "form-step-enter" : "form-step-enter-back"}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${themeLightBg} ${themeText} text-xs font-medium mb-3`}>
                    <MapPin className="w-3.5 h-3.5" />
                    Step 3 of 3
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#213d4f]">Almost there!</h3>
                  <p className="text-xs text-[#213d4f]/50 mt-1">Just a few more details</p>
                </div>

                <div>
                  <label className="text-sm text-[#213d4f]/70 mb-3 block font-medium">City</label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#213d4f]/30" />
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full h-13 sm:h-14 pl-12 pr-4 border-2 border-[#213d4f]/10 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 outline-none appearance-none cursor-pointer transition-all"
                      style={{ borderColor: formData.city ? themeColor : undefined }}
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#213d4f]/30 rotate-90" />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'pincode' ? themeText : 'text-[#213d4f]/30'}`} />
                  <Input
                    type="text"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    onFocus={() => setFocusedField('pincode')}
                    onBlur={() => setFocusedField(null)}
                    className="pl-12 h-13 sm:h-14 border-2 rounded-xl text-base transition-all"
                    style={{ borderColor: focusedField === 'pincode' ? themeColor : undefined }}
                  />
                  {formData.pincode.length === 6 && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 form-scale-in" />
                  )}
                </div>

                <div 
                  className="p-4 rounded-2xl border-2 border-dashed"
                  style={{ borderColor: `${themeColor}40`, background: `${themeColor}08` }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${themeColor}20` }}
                    >
                      <Zap className="w-5 h-5" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#213d4f] mb-1">You're almost there! 🎉</h4>
                      <p className="text-xs text-[#213d4f]/60">
                        Submit to check eligibility and get personalized offers from 20+ lenders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-8 form-scale-in">
                {/* Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: '20%',
                        background: [themeColor, '#eefe92', '#22c55e', '#3b82f6'][i % 4],
                        animation: `confetti 1s ease-out forwards`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center success-bounce"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${isPersonal ? '#ec4899' : '#14b8a6'})` }}
                  >
                    <PartyPopper className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full pulse-ring" style={{ borderColor: themeColor, borderWidth: 2 }} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#213d4f] mb-3">
                  Application Submitted! 
                </h3>
                <p className="text-sm text-[#213d4f]/60 mb-6 max-w-xs mx-auto">
                  We're checking your eligibility with our partner lenders. Expect offers within 24 hours.
                </p>

                {/* Summary Card */}
                <div 
                  className="p-4 rounded-2xl mb-6 text-left"
                  style={{ background: `${themeColor}10` }}
                >
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#213d4f]/50 text-xs">Loan Amount</span>
                      <p className="font-bold" style={{ color: themeColor }}>{formatCurrency(formData.loanAmount)}</p>
                    </div>
                    <div>
                      <span className="text-[#213d4f]/50 text-xs">Monthly Income</span>
                      <p className="font-bold" style={{ color: themeColor }}>{formatCurrency(formData.monthlyIncome)}</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  className={`w-full h-14 bg-gradient-to-r ${themeGradient} hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                  onClick={() => window.location.href = "/"}
                >
                  Back to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="h-13 sm:h-14 px-6 border-2 border-[#213d4f]/10 text-[#213d4f] hover:bg-[#f8fdf2] rounded-xl font-semibold transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                    className={`flex-1 h-13 sm:h-14 bg-gradient-to-r ${themeGradient} hover:opacity-90 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isStep3Valid || isSubmitting}
                    className={`flex-1 h-13 sm:h-14 bg-gradient-to-r ${themeGradient} hover:opacity-90 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Checking Eligibility...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Check Eligibility
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </form>

          {/* Security Badge */}
          {step < 4 && (
            <div className="mt-6 pt-5 border-t border-[#213d4f]/5">
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#213d4f]/40">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>256-bit SSL</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#213d4f]/20" />
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>RBI Compliant</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#213d4f]/20" />
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Instant</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
