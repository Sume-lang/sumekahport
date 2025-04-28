import { getReferencesperson } from "@/context/ref";
import { FaQuoteLeft } from "react-icons/fa";
import { Dancing_Script } from "next/font/google";
import { ScrollAnimation } from "@/components/reusable/scrollAnimation";
import { AnimatePresence } from "framer-motion";
const dancing = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default async function ReferencesPage() {
  try {
    const Ref = await getReferencesperson();
    return (
      <ScrollAnimation className="flex flex-col mx-auto gap-5 w-full delay-200 h-auto">
        <section className="lg:grid lg:grid-cols-1 lg:items-start lg:justify-between">
          <h1 className="text-2xl lg:text-4xl text-start">
            What They Say <span className="text-slate-50">About Me</span>
          </h1>
          <p className="lg:w-1/2 w-full lg:text-md text-[15px] font-light">
           As a Proffesional, I have had the opportunity to work with a wide range of partners and have been able to create an opportunity that meet with the Ecosystem.
          </p>
        </section>
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-2 w-full h-auto ">
          <AnimatePresence>
            {Ref.map((ref) => (
              <div
                key={ref.id}
                className="rounded-lg p-4 w-full h-full gap-1 border-[#faad86]/10 border-[1px] flex flex-col justify-start"
              >
                <div>
                  <span>
                    <FaQuoteLeft className="text-[#faad86] text-2xl" />
                  </span>
                </div>
                <h2 className="text-md font-bold">{ref.name}</h2>
                <h2 className="text-sm">{ref.position}</h2>
                <p className="text-sm">{ref.organization}</p>
                <p className="lg:text-md text-[15px] font-extralight">
                  "{ref.desc}"
                </p>
              </div>
            ))}
          </AnimatePresence>
        </section>
      </ScrollAnimation>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">References</h1>
        <div className="px-4 py-3 rounded">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
}
