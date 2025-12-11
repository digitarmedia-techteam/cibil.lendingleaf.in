import Image from "next/image";
import bankPhoto from "../../images/Bank Name=Axis bank.png";
import bankPhoto2 from "../../images/Bank Name=State Bank of India.png";
import bankPhoto3 from "../../images/Bank Name=HDFC Bank.png";
import bankPhoto4 from "../../images/Bank Name=ICICI Bank.png";
export default function LogoCloud() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div>
          <p className="text-muted-foreground font-medium">
            Our Top Lenders
          </p>
          <div className="mt-4 flex items-center gap-12">
            <div className="flex">
              <Image
                src={bankPhoto}
                alt="Axis Bank Logo"
                height={20}
                className="mx-auto h-5 w-fit"
              />
            </div>

            <div className="flex">
              <Image
                src={bankPhoto2}
                alt="Axis Bank Logo"
                height={20}
                className="mx-auto h-5 w-fit"
              />
            </div>
            <div className="flex">
               <Image
                src={bankPhoto3}
                alt="Axis Bank Logo"
                height={20}
                className="mx-auto h-5 w-fit"
              />
            </div>
            <div className="flex">
              <Image
                src={bankPhoto4}
                alt="Axis Bank Logo"
                height={20}
                className="mx-auto h-5 w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
