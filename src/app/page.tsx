import Hero from "@/components/sections/Hero";
import Services from "../components/sections/Services";
import Steps from "@/components/sections/Steps";
import CreditCards from "@/components/sections/CreditCards";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { MarqueeAnimation } from "@/components/sections/MarqueeBanner";




export default function Home() {
  return (
    <>
      <div className="overflow-hidden relative">
      
        <div className="fixed inset-0 bg-gradient-to-b from-white from-0% via-[#f8fdf2] via-30% to-[#eefe92]/15 to-100% -z-10" />
        <Hero />
        <Services />
        <CreditCards />
        <Steps />
        <WhyChooseUs />
      </div>
    </>
  );
}
