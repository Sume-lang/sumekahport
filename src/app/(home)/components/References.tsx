import { getReferencesperson } from "@/context/ref";
import { FaQuoteLeft } from "react-icons/fa";
import ScrollMotion from "@/components/reusable/scrollMotion";
import { Dancing_Script } from "next/font/google";
const dancing = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default async function ReferencesPage() {
  try {
    const Ref = await getReferencesperson();
    return (
      <ScrollMotion className="flex flex-col mx-auto p-4 gap-10 w-full delay-200 lg:pt-20 h-[50vh]" threshold={0.2} >
        <section>
          <h1 className={`${dancing.className} text-2xl lg:text-6xl font-bold text-start ${dancing.className}`}>What They Say <span className="text-slate-50">About Me</span></h1>
          <p className="font-light lg:w-1/2 w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum minima nesciunt magni laudantium, aliquid, hic laboriosam sapiente officiis dolorum perspiciatis impedit quam reiciendis? Fugit error, asperiores voluptates sunt minima omnis?r
          </p>
        </section>
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-2 w-full h-[20vh] lg:pt-10">
          {Ref.map((ref) => (
            <div
              key={ref.id}
              className="rounded-lg p-4 w-full h-full gap-1 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/10 border-[1px] flex flex-col justify-start"
            >
              <div>
                <span>
                  <FaQuoteLeft className="text-[#faad86] text-2xl" />
                </span>
              </div>
              <h1 className="text-2xl font-bold">{ref.name}</h1>
              <p className="text-sm">{ref.organization}</p>
              <p className="text-sm font-extralight">"{ref.desc}"</p>
            </div>
          ))}
        </section>
      </ScrollMotion>
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
