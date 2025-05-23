import { getEducations } from "@/context/educations";
import { ScrollAnimation } from "@/components/reusable/scrollAnimation";
import { AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
export default async function Educations() {
  try {
    const Data = await getEducations();
    return (
      <ScrollAnimation className="flex flex-col mx-auto gap-5 w-full delay-200 h-auto items-center justify-center">
        <section className="lg:grid lg:grid-cols-1 lg:items-start lg:justify-between">
          <h1 className="text-2xl lg:text-4xl text-start">
            My <span className="text-slate-700">Educations</span>
          </h1>
          <p className="lg:w-1/2 w-full lg:text-md text-[15px] font-light">
            I have been fortunate enough to have a diverse educational
            background, which has equipped me with a strong foundation in
            various fields. Both my formal and informal education have been
            instrumental in shaping me into the professional and creative person
            I am today.
          </p>
        </section>
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-2 w-full h-auto">
          <AnimatePresence>
            {Data.map((education) => (
              <div
                key={education.id}
                className="rounded-lg p-4 w-full h-full border-[#faad86]/10 border-[1px] flex flex-col justify-start"
              >
                <div>
                  <span>
                    <FaQuoteLeft className="text-[#faad86] text-2xl" />
                  </span>
                </div>

                <h2 className="text-lg font-bold">{education.degree}</h2>
                <h2 className="text-sm font-bold">{education.fieldOfStudy}</h2>
                <h2 className="text-sm font-light">{education.institution}</h2>
                <div className="flex flex-row gap-2 font-light">
                  <h1>{education.startDate}</h1>
                  <span>-</span>
                  <h1>{education.endDate}</h1>
                </div>
              </div>
            ))}
          </AnimatePresence>
        </section>
      </ScrollAnimation>
    );
  } catch (error) {
    console.log(error);
  }
}
