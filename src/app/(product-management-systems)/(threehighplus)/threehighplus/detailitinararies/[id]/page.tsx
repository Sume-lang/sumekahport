import React from "react";
// import SliderInOut from "@/components/reusable/sliderinout";
import { getAllItineraryById } from "@/context/threehighplus/getItinarary";
import Img from "next/image";
export default async function PackgesByIdDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const Itinerary = await getAllItineraryById(id);

  if (!Itinerary) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <h1>Sorry, Itinerary not found</h1>
      </div>
    );
  }

  return (
    <main className="h-auto w-full">
      <section
        className="h-[60vh] w-full"
        style={{
          backgroundImage: `url(/threehighplus/images/${Itinerary.img}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center items-start h-full bg-gradient-to-t from-[#030E36]/120 to-[#00163B]/5 p-7">
          <div className="flex flex-col justify-end items-start h-full w-full boder lg:p-10 lg:pr-24 lg:pl-24">
            <h1 className="text-3xl lg:text-5xl font-light text-white text-start">
              Welcome to Our{" "}
              <span className="text-slate-500 font-bold">Itinery</span>
            </h1>
            <h1 className="lg:text-3xl text-2xl font-bold text-white">
              {Itinerary.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="lg:p-10 lg:pr-24 lg:pl-24 p-8">
        <div className="">
          <p className="w-full font-light">{Itinerary.desc}</p>
        </div>
        <div className="gap-5 h-full flex lg:flex-row flex-col w-full mt-10">
          <div className="lg:w-1/2 w-full">
            {" "}
            {Itinerary.itineraries?.map((item, index: number) => (
              <div
                className="flex flex-col items-start justify-center"
                key={index}
              >
                <h1 className="text-2xl font-bold text-start">{item.title}</h1>
                <p className="w-full font-light mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="lg:w-1/2 w-full h-auto relative">
            <div className="absolute inset-0 bg-[#00163B]/50 lg:rounded-bl-[100px] lg:rounded-tr-[100px] rounded-md" />

            <Img
              src={`/threehighplus/images/${Itinerary.contentImage}.jpg`}
              alt={Itinerary.title}
              width={300}
              height={300}
              className="w-full lg:rounded-bl-[100px] lg:rounded-tr-[100px] rounded-md p-1 border-[1px] border-slate-50/10 shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="lg:p-10 lg:pr-24 lg:pl-24 p-8">
        <div className="">
          <h1 className="text-2xl font-light border-slate-50/20 border-b-[1px]">
            an Additional Notes for <span className="text-slate-500">You</span>
          </h1>
          <p className="mt-2">{Itinerary.additionalnote}</p>
        </div>
      </section>
    </main>
  );
}
