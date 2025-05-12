import { getReferencesperson } from "@/context/ref";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default async function ReferencesPage() {
  try {
    const Ref = await getReferencesperson();
    return (
      <motion.div
        className="flex flex-col mx-auto gap-5 w-full delay-200 h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          className="lg:grid lg:grid-cols-1 lg:items-start lg:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 className="text-2xl lg:text-6xl font-bold">
            What They Say <span className="text-slate-50">About Me</span>
          </motion.h1>
          <motion.p className="font-light lg:w-1/2 w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
            minima nesciunt magni laudantium, aliquid, hic laboriosam sapiente
            officiis dolorum perspiciatis impedit quam reiciendis? Fugit error,
            asperiores voluptates sunt minima omnis?r
          </motion.p>
        </motion.section>
        <motion.section
          className="grid lg:grid-cols-3 grid-cols-1 gap-2 w-full h-auto lg:pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {Ref.map((ref) => (
              <motion.div
                key={ref.id}
                className="rounded-lg p-4 w-full h-full gap-1 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/10 border-[1px] flex flex-col justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div>
                  <span>
                    <FaQuoteLeft className="text-[#faad86] text-2xl" />
                  </span>
                </motion.div>
                <motion.h2 className="text-2xl font-bold">{ref.name}</motion.h2>
                <motion.h2 className="text-sm">{ref.position}</motion.h2>
                <motion.p className="text-sm">{ref.organization}</motion.p>
                <motion.p className="text-sm font-extralight">
                  "{ref.desc}"
                </motion.p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      </motion.div>
    );
  } catch {
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

