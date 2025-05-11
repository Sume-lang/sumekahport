"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Preparations = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tips = [
    {
      id: 1,
      title: "Plan your itinerary.",
      content:
        "Research the places you want to visit and create a rough itinerary.",
    },
    {
      id: 2,
      title: "Book accommodations and transportation.",
      content:
        "Find accommodations and transportation options that are suitable for your budget and preferences.",
    },
    {
      id: 3,
      title: "Pack appropriately.",
      content:
        "Make sure to pack clothes and gear suitable for the activities you plan to do.",
    },
    {
      id: 4,
      title: "Stay hydrated and healthy.",
      content:
        "Drink plenty of water and take necessary precautions to stay healthy during your trip.",
    },
    {
      id: 5,
      title: "Respect local customs and culture.",
      content:
        "Learn about the local customs and culture to ensure a respectful and enjoyable experience.",
    },
    {
      id: 6,
      title: "Stay connected.",
      content:
        "Make sure to have a way to stay connected with family and friends during your trip.",
    },
    {
      id: 7,
      title: "Have fun!",
      content:
        "Enjoy your trip and make the most of your time exploring new places.",
    },
    {
      id: 8,
      title: "Be flexible.",
      content:
        "Be open to changes in your plans and embrace unexpected experiences.",
    },
    {
      id: 9,
      title: "Take lots of photos.",
      content:
        "Capture the memories of your trip by taking lots of photos and videos.",
    },
    {
      id: 10,
      title: "Keep an open mind.",
      content:
        "Be open to new experiences and meeting new people during your travels.",
    },
    {
      id: 11,
      title: "Learn some basic phrases.",
      content:
        "Learn some basic phrases in the local language to help you communicate with locals.",
    },
  ];

  return (
    <main className="p-8 h-auto flex lg:flex-row flex-col gap-2">
      <nav className="lg:flex flex-col grid grid-cols-2 gap-2 lg:w-1/3 w-full">
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
      <section className="mt-4 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {tips[activeIndex].content}
        </motion.div>
      </section>
    </main>
  );
};

export default Preparations;

