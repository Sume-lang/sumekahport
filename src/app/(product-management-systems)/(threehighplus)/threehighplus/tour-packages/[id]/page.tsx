import React from "react";
// import SliderInOut from "@/components/reusable/sliderinout";
import { getPackagesById } from "@/context/threehighplus/tourpackages";
export default async function PackgesByIdDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const Packages = await getPackagesById(id);

  if (!Packages) {
    return <div>Sorry, Blog post not found</div>;
  }

  return (
    <main className="h-screen w-full">
      <section
        className="h-[60vh] w-full"
        style={{
          backgroundImage: `url(/threehighplus/images/${Packages.img}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center items-start h-full bg-gradient-to-t from-[#030E36]/120 to-[#00163B]/5 p-10">
          <h1 className="text-3xl lg:text-5xl font-light text-white">
            Welcome to Our <span className="text-slate-500 font-bold">Packages</span>
          </h1>
          <h1 className="lg:text-5xl text-2xl font-bold text-white">{Packages.title}</h1>
        </div>
      </section>
      <section className="container mx-auto p-5">
        {Packages.desc &&
          Packages.desc.map((paragraph, index) => (
            <p className="my-5" key={index}>
              {paragraph}
            </p>
          ))}
      </section>
    </main>
  );
}
