"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Style from "../threehigh.module.css";

const Preparations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tips = [
    {
      id: 1,
      title: "Plan your trekking route.",
      content: (
        <div>
          <p>
            Planning your trekking route is crucial to ensuring a safe and
            enjoyable journey. Research the various trails leading to Mount
            Rinjani and determine which route aligns with your fitness level and
            interests. Whether you prefer a challenging ascent or a leisurely
            walk, there's a path for everyone.
          </p>
          <p>
            It's advisable to create a rough itinerary, keeping in mind the
            duration of your trek, rest stops, and scenic viewpoints. Consider
            the time of year and weather conditions when planning your route, as
            some trails may be more accessible during certain seasons.
          </p>
          <p>
            Additionally, familiarize yourself with the terrain and elevation
            changes. Understanding the physical demands of the trek will help
            you prepare mentally and physically, ensuring you have an
            unforgettable experience.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Accommodations and transportation.",
      content: (
        <div>
          <p>
            Finding suitable accommodations and reliable transportation is
            essential for a smooth trekking experience. Research lodging options
            in Senaru or Sembalun, the two primary gateways to Mount Rinjani.
            From budget-friendly hostels to cozy guesthouses, there's a range of
            choices to fit every traveler's preference and budget.
          </p>
          <p>
            Transportation to and from the trekking trail is equally important.
            Look into shuttle services, private transfers, or local buses that
            can get you to the trailhead. Booking in advance is recommended,
            especially during peak trekking seasons, to avoid any last-minute
            hassles.
          </p>
          <p>
            Remember to consider travel insurance to cover unforeseen
            circumstances and ensure peace of mind throughout your journey. A
            well-organized travel plan will set the foundation for a memorable
            trekking adventure.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Pack appropriately.",
      content: (
        <div>
          <p>
            Packing appropriately is key to a comfortable and safe trekking
            experience. Start by making a checklist of essential items, ensuring
            you have the right clothing, gear, and supplies for the trek.
            Lightweight, moisture-wicking clothing is ideal for staying cool and
            dry during the hike.
          </p>
          <p>
            Invest in a durable pair of trekking shoes or boots that provide
            support and grip on uneven terrain. Don't forget to pack a hat,
            sunglasses, and sunscreen to protect yourself from the sun, as well
            as a rain jacket in case of unexpected weather changes.
          </p>
          <p>
            Carry enough water and snacks to keep you energized, and consider
            packing a first-aid kit for emergencies. Proper preparation and
            packing will enable you to focus on the trek and fully immerse
            yourself in the breathtaking scenery of Mount Rinjani.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="p-8 h-auto flex lg:flex-row flex-col">
      <nav className="lg:flex flex-col grid grid-cols-2 gap-2 lg:w-1/3 w-full bg-slate-500 p-2">
        {tips.map((tip, index) => (
          <button
            key={index}
            className={`p-2 text-start text-[15px] font-light ${
              activeIndex === index
                ? "bg-slate-50/10 rounded-md transition-all duration-300 ease-linear"
                : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tip.title}
          </button>
        ))}
      </nav>
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${Style.tips} lg:text-[15px] text-[12px] font-light shadow-md w-full`}
        >
          <div className="h-full w-full bg-gradient-to-t from-[#030E36]/120 to-[#00163B]/5 p-2">
            <span>
              <b>
                Tip: {""}
                {tips[activeIndex].title}{" "}
              </b>
            </span>
            {tips[activeIndex].content}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Preparations;
