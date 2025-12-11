"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Leaf,
  HelpCircle,
  DollarSign,
  BarChart,
  Menu as MenuIcon,
  X as XIcon,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Home,
  CreditCard,
  Heart,
  Umbrella,
  Zap,
  TrendingUp,
  Headphones,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";


// Types
interface NavLink {
  title: string;
  href: string;
  description?: string;
  icon: React.ElementType;
  badge?: string;
  color?: string;
}

// Link data with vibrant colors
export const productLinks: NavLink[] = [
  { title: "Credit Score", href: "/credit-score", description: "Check your score instantly for free", icon: BarChart, badge: "Free", color: "#22c55e" },
  { title: "Personal Loan", href: "/loans/personal", description: "Get up to ₹40L with minimal docs", icon: DollarSign, color: "#3b82f6" },
  { title: "Home Loan", href: "/loans/home", description: "Finance your dream home at best rates", icon: Home, color: "#8b5cf6" },
  { title: "Credit Cards", href: "/#credit-cards", description: "Compare and apply for top cards", icon: CreditCard, color: "#f59e0b" },
  { title: "Health Insurance", href: "#", description: "Protect what matters most", icon: Heart, color: "#ef4444" },
  { title: "Life Insurance", href: "#", description: "Secure your family's future", icon: Umbrella, color: "#06b6d4" },
];

export const companyLinks: NavLink[] = [
  { title: "About Us", href: "/about", description: "Our story and mission", icon: Users },
  { title: "Customer Stories", href: "#", description: "Success stories from our clients", icon: Star },
  { title: "Terms of Service", href: "#", description: "How we operate", icon: FileText },
  { title: "Privacy Policy", href: "#", description: "Your data protection", icon: Shield },
  { title: "Refund Policy", href: "#", description: "Refunds and cancellations", icon: RotateCcw },
  { title: "Partnerships", href: "#", description: "Collaborate with us", icon: Handshake },
  { title: "Blog", href: "#", description: "Insights and updates", icon: Leaf },
  { title: "Help Center", href: "#", description: "Get support", icon: HelpCircle },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Magical CSS Animations */}
      <style jsx global>{`
        @keyframes nav-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(77, 124, 15, 0.15), 0 0 40px rgba(238, 254, 146, 0.1); }
          50% { box-shadow: 0 0 30px rgba(77, 124, 15, 0.25), 0 0 60px rgba(238, 254, 146, 0.15); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-3px) translateX(2px); }
          50% { transform: translateY(-5px) translateX(0); }
          75% { transform: translateY(-3px) translateX(-2px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes slide-up-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .nav-magical {
          animation: nav-glow 3s ease-in-out infinite;
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .float-particle { animation: float-particle 3s ease-in-out infinite; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .slide-up-fade { animation: slide-up-fade 0.25s ease-out forwards; }
        .text-shimmer {
          background: linear-gradient(90deg, #4d7c0f, #22c55e, #eefe92, #22c55e, #4d7c0f);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
        .nav-link-magic::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4d7c0f, #22c55e, #eefe92);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link-magic:hover::after {
          width: 80%;
        }
        .dropdown-card {
          transform-origin: top center;
        }
        .dropdown-card::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
        }
      `}</style>

      {/* Navbar */}
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
          isScrolled ? "py-3 px-4 sm:px-6 lg:px-8" : "py-0"
        )}
      >
        <nav
          className={cn(
            "relative flex items-center justify-between transition-all duration-500 max-w-7xl mx-auto",
            isScrolled
              ? "h-16 bg-[#f8fdf2]/80 backdrop-blur-2xl rounded-2xl border border-[#4d7c0f]/10 shadow-lg shadow-[#4d7c0f]/5 px-5 sm:px-8"
              : "h-20 bg-transparent px-4 sm:px-6 lg:px-8 xl:px-20"
          )}
        >
            {/* Magical gradient border effect - only on scroll */}
            {isScrolled && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eefe92]/20 via-[#f8fdf2]/50 to-[#eefe92]/20 gradient-animate" />
                <div className="absolute inset-0 border border-[#4d7c0f]/10 rounded-2xl" />
              </div>
            )}

            {/* Floating particles decoration - only when scrolled */}
            {isScrolled && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#4d7c0f]/40 rounded-full float-particle"
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2 group">
              <span className={cn(
                "font-termina font-black tracking-tight transition-all duration-300",
                isScrolled ? "text-xl" : "text-2xl"
              )}>
                <span className="text-[#213d4f] group-hover:text-shimmer transition-all duration-500">Lending</span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#4d7c0f] via-[#22c55e] to-[#4d7c0f] bg-clip-text text-transparent gradient-animate">
                    Leaf
                  </span>
                  {/* Sparkle effect */}
                  <Sparkles 
                    className="absolute -top-1 -right-4 w-3 h-3 text-[#eefe92] sparkle" 
                    style={{ animationDelay: '0.5s' }}
                  />
                </span>
              </span>
            </Link>

            {/* Spacer to push navigation right */}
            <div className="flex-1" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("products")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 nav-link-magic",
                    activeDropdown === "products"
                      ? "text-[#4d7c0f] bg-gradient-to-r from-[#eefe92]/40 to-[#4d7c0f]/10"
                      : "text-[#213d4f] hover:text-[#4d7c0f]"
                  )}
                >
                 
                  Products
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    activeDropdown === "products" && "rotate-180"
                  )} />
                </button>

                {/* Products Mega Dropdown */}
                {activeDropdown === "products" && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] slide-up-fade dropdown-card"
                    onMouseEnter={() => handleDropdownEnter("products")}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="relative bg-white rounded-3xl border border-[#eefe92]/30 shadow-2xl shadow-[#4d7c0f]/10 overflow-hidden">
                      {/* Gradient header */}
                      <div className="relative px-6 py-5 bg-gradient-to-r from-[#213d4f] via-[#2d5a6b] to-[#213d4f] overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#eefe92] flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-[#213d4f]" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">Financial Products</h3>
                              <p className="text-white/60 text-xs">Choose the right solution for you</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eefe92]/20 border border-[#eefe92]/30">
                            <Sparkles className="w-3 h-3 text-[#eefe92]" />
                            <span className="text-[10px] font-bold text-[#eefe92] uppercase tracking-wider">Best Rates</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Links Grid */}
                      <div className="p-5 grid grid-cols-2 gap-3">
                        {productLinks.map((link, index) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f8fdf2] hover:to-white border border-transparent hover:border-[#eefe92]/30 hover:shadow-lg hover:shadow-[#4d7c0f]/5"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {/* Icon with color */}
                            <div 
                              className="relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                              style={{ 
                                background: `linear-gradient(135deg, ${link.color}20, ${link.color}10)`,
                              }}
                            >
                              <link.icon 
                                className="w-6 h-6 transition-all duration-300" 
                                style={{ color: link.color }}
                              />
                              {/* Glow effect */}
                              <div 
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                                style={{ background: link.color }}
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-[#213d4f] group-hover:text-[#4d7c0f] transition-colors">
                                  {link.title}
                                </span>
                                {link.badge && (
                                  <span 
                                    className="px-2 py-0.5 text-[10px] font-bold text-white rounded-full"
                                    style={{ background: `linear-gradient(135deg, ${link.color}, ${link.color}cc)` }}
                                  >
                                    {link.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#213d4f]/50 leading-relaxed">
                                {link.description}
                              </p>
                            </div>

                            {/* Arrow */}
                            <ArrowRight className="w-4 h-4 text-[#213d4f]/20 group-hover:text-[#4d7c0f] group-hover:translate-x-1 transition-all duration-300 mt-1" />
                          </Link>
                        ))}
                      </div>

                      {/* CTA Footer */}
                      <div className="px-5 py-4 bg-gradient-to-r from-[#f8fdf2] to-[#eefe92]/20 border-t border-[#eefe92]/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#4d7c0f]/10 flex items-center justify-center">
                            <HelpCircle className="w-4 h-4 text-[#4d7c0f]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#213d4f]">Need guidance?</p>
                            <p className="text-xs text-[#213d4f]/50">Our experts are here to help</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-semibold rounded-xl shadow-lg shadow-[#4d7c0f]/25 hover:shadow-xl hover:shadow-[#4d7c0f]/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Get Free Advice
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("company")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 nav-link-magic",
                    activeDropdown === "company"
                      ? "text-[#4d7c0f] bg-gradient-to-r from-[#eefe92]/40 to-[#4d7c0f]/10"
                      : "text-[#213d4f] hover:text-[#4d7c0f]"
                  )}
                >
                  Company
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    activeDropdown === "company" && "rotate-180"
                  )} />
                </button>

                {/* Company Dropdown */}
                {activeDropdown === "company" && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] slide-up-fade dropdown-card"
                    onMouseEnter={() => handleDropdownEnter("company")}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="relative bg-white rounded-2xl border border-[#eefe92]/30 shadow-2xl shadow-[#4d7c0f]/10 overflow-hidden p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {companyLinks.map((link, index) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f8fdf2] hover:to-white"
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#213d4f]/5 to-[#4d7c0f]/5 flex items-center justify-center group-hover:from-[#4d7c0f]/20 group-hover:to-[#eefe92]/20 transition-all duration-300">
                              <link.icon className="w-4 h-4 text-[#213d4f]/50 group-hover:text-[#4d7c0f] transition-colors duration-300" />
                            </div>
                            <span className="text-sm font-medium text-[#213d4f]/70 group-hover:text-[#213d4f] transition-colors">
                              {link.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
             

              {/* CTA Button */}
              <Button
                className={cn(
                  "hidden sm:flex relative overflow-hidden rounded-xl font-bold transition-all duration-500 group",
                  "bg-gradient-to-r from-[#4d7c0f] via-[#22c55e] to-[#4d7c0f] gradient-animate",
                  "shadow-lg shadow-[#4d7c0f]/30 hover:shadow-xl hover:shadow-[#4d7c0f]/40",
                  "hover:-translate-y-1 hover:scale-105",
                  isScrolled ? "h-10 px-5" : "h-11 px-6"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in touch
                  <Headphones className="w-4 h-4" />
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>

              {/* Mobile Menu Button */}
              <MobileNav isScrolled={isScrolled} />
            </div>
          </nav>
      </header>

      {/* Spacer */}
      <div className={cn("transition-all duration-500", isScrolled ? "h-[88px]" : "h-[80px]")} />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full transition-all duration-500",
          "bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] text-white",
          "shadow-lg shadow-[#4d7c0f]/30 hover:shadow-xl hover:shadow-[#4d7c0f]/40",
          "hover:scale-110 hover:-translate-y-1",
          "flex items-center justify-center group",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 overflow-hidden" />
      </button>
    </>
  );
}

// Mobile Navigation
function MobileNav({ isScrolled }: { isScrolled: boolean }) {
  const [openSections, setOpenSections] = useState<string[]>(["products"]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const sections = [
    { id: "products", name: "Products", links: productLinks },
    { id: "company", name: "Company", links: companyLinks },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "lg:hidden rounded-xl transition-all duration-300 hover:bg-[#eefe92]/30",
            isScrolled ? "w-10 h-10" : "w-11 h-11"
          )}
        >
          <MenuIcon className="w-5 h-5 text-[#213d4f]" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full sm:max-w-md p-0 bg-gradient-to-b from-white to-[#f8fdf2] border-l border-[#eefe92]/30"
        showClose={false}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#eefe92]/30">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-termina font-black text-xl">
              <span className="text-[#213d4f]">Lending</span>
              <span className="bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] bg-clip-text text-transparent">Leaf</span>
            </span>
          </Link>
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-xl hover:bg-[#eefe92]/30">
              <XIcon className="w-5 h-5 text-[#213d4f]" />
            </Button>
          </SheetClose>
        </div>

        {/* Mobile Content */}
        <div className="overflow-y-auto h-[calc(100vh-160px)] py-4">
          {sections.map((section) => (
            <div key={section.id} className="px-4 mb-2">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="text-sm font-bold text-[#213d4f] uppercase tracking-wider flex items-center gap-2">
                  {section.id === "products" && <Zap className="w-4 h-4 text-[#4d7c0f]" />}
                  {section.name}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#4d7c0f] transition-transform duration-300",
                    openSections.includes(section.id) && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  openSections.includes(section.id) ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="space-y-2 pb-4">
                  {section.links.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-[#eefe92]/20 hover:border-[#eefe92]/50 hover:bg-white transition-all duration-300"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: link.color
                              ? `linear-gradient(135deg, ${link.color}20, ${link.color}10)`
                              : "linear-gradient(135deg, #213d4f10, #4d7c0f10)",
                          }}
                        >
                          <link.icon
                            className="w-6 h-6"
                            style={{ color: link.color || "#4d7c0f" }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#213d4f]">{link.title}</span>
                            {link.badge && (
                              <span
                                className="px-2 py-0.5 text-[10px] font-bold text-white rounded-full"
                                style={{ background: link.color || "#4d7c0f" }}
                              >
                                {link.badge}
                              </span>
                            )}
                          </div>
                          {link.description && (
                            <p className="text-xs text-[#213d4f]/50 mt-0.5">{link.description}</p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#213d4f]/30" />
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </div>
          ))}

         
        </div>

        {/* Mobile Footer CTAs */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#eefe92]/30 bg-white/80 backdrop-blur-xl">
          <div className="flex gap-3">
          
            <Button className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#4d7c0f] to-[#22c55e] hover:from-[#3d6310] hover:to-[#1a9e4a] text-white font-bold shadow-lg shadow-[#4d7c0f]/25">
              Get in touch
              <Headphones className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Navbar;
