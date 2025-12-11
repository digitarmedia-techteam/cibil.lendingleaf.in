"use client";

import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// Data structure for grouped footer links
interface FooterLink { label: string; href: string; external?: boolean; }
interface FooterGroup { heading: string; links: FooterLink[]; }

const company: FooterGroup = {
  heading: "Company Info",
  links: [
    { label: "About Us", href: "/about" },
    { label: "How LendingLeaf Works", href: "/how-it-works" },
    { label: "Careers", href: "/careers" },
  ],
};

const loans: FooterGroup = {
  heading: "Loans We Offer",
  links: [
    { label: "Home Loan", href: "/loans/home" },
    { label: "Personal Loan", href: "/loans/personal" },
    { label: "Car Loan", href: "/loans/car" },
    { label: "Gold Loan", href: "/loans/gold" },
  ],
};

const tools: FooterGroup = {
  heading: "Tools & Features",
  links: [
    { label: "Loan Calculator", href: "/tools/loan-calculator" },
    { label: "Credit Check", href: "/tools/credit-check" },
    { label: "FAQs", href: "/faqs" },
  ],
};

const support: FooterGroup = {
  heading: "Support",
  links: [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const social: FooterGroup = {
  heading: "Connect With Us",
  links: [
    { label: "Facebook", href: "https://facebook.com", external: true },
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Twitter", href: "https://twitter.com", external: true },
  ],
};

const groups: FooterGroup[] = [company, loans, tools, support, social];

export function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Placeholder async simulation
    setTimeout(() => {
      // rudimentary success simulation
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
      setEmail("");
    }, 900);
  }

  return (
    <footer className=" border-t border-border/40 bg-background/60 backdrop-blur-lg">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand + newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-xl font-bold tracking-tight">LendingLeaf</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Empowering your financial journey. Compare loan products, understand terms, and make smarter decisions.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="relative space-y-3 rounded-lg border p-4 backdrop-blur-sm bg-background/50"
              aria-label="Email newsletter signup"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="newsletter" className="text-sm font-medium">
                  Email Newsletter
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="newsletter"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="sm:flex-1"
                    aria-describedby="newsletter-desc"
                  />
                  <Button type="submit" disabled={status === "loading"} className="sm:w-auto">
                    {status === "loading" && <span className="mr-1 animate-pulse">•</span>}
                    {status === "success" ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
                <p id="newsletter-desc" className="text-xs text-muted-foreground">
                  Get product updates, rate alerts & educational content. Unsubscribe anytime.
                </p>
                {status === "success" && (
                  <p className="text-xs text-green-600">Thanks! Please check your inbox.</p>
                )}
              </div>
            </form>
            <div className="flex gap-4 pt-2">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <Facebook className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <Twitter className="size-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Link groups */}
          <nav aria-label="Footer navigation" className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {groups.map((group) => (
              <div key={group.heading} className="space-y-4">
                <h4 className="text-sm font-semibold tracking-wide text-foreground/90">
                  {group.heading}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-border/40 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LendingLeaf. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/terms" className="hover:text-foreground">Terms</a>
            <a href="/sitemap" className="hover:text-foreground">Sitemap</a>
          </div>
        </div>
      </div>
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
      className="group inline-flex size-9 items-center justify-center rounded-full border border-border/40 bg-background/40 backdrop-blur hover:border-border/70 hover:bg-background/60 transition"
    >
      {children}
    </a>
  );
}

export default Footer;
