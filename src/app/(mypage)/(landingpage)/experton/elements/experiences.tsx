import { getExperience } from "@/context/experiences";

export default async function Experiences() {
  try {
    const experience = await getExperience();
    return (
      <main className="flex lg:flex-row gap-2 mx-auto p-4 w-full">
        <section className="grid lg:grid-cols-3 gap-2 w-full">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg p-4 w-full h-full gap-1 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/20 border-[1px] shadow-lg flex flex-col justify-start"
            >
              <h1 className="text-2xl font-bold">{exp.name}</h1>
              <h1 className="text-sm">{exp.position}</h1>
              <h2 className="gap-2 w-full">
                {Array.isArray(exp.periode)
                  ? exp.periode.join("  / ") 
                  : exp.periode}
              </h2>
            </div>
          ))}
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Experiences</h1>
        <div className="px-4 py-3 rounded">
          Error loading experiences. Please try again later.
        </div>
      </div>
    );
  }
}
