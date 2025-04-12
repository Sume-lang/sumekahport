import { getReferencesperson } from "@/context/ref";
import { FaQuoteLeft } from "react-icons/fa";

export default async function ReferencesPage() {
  try {
    const Ref = await getReferencesperson();
    return (
      <main className="flex flex-row gap-2 mx-auto p-4 w-full">
        <section className="flex flex-row gap-2 w-1/4">
          {Ref.map((ref) => (
            <div
              key={ref.id}
              className="rounded-lg p-4 w-full h-full gap-1 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/20 border-[1px] shadow-lg flex flex-col justify-start"
            >
              <div>
                <span>
                  <FaQuoteLeft className="text-[#faad86] text-2xl" />
                </span>
              </div>
              <h1 className="text-2xl font-bold">{ref.name}</h1>
              <p className="text-sm">{ref.organization}</p>
              <p className="text-sm">"{ref.desc}"</p>
            </div>
          ))}
        </section>
      </main>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
        <div className="px-4 py-3 rounded">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
}
