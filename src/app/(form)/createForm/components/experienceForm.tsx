"use client";
import { useState } from "react";
import { createExperience } from "@/context/experiences";
import {
  FaBuilding,
  FaCalendar,
  FaLevelUpAlt,
  FaNetworkWired,
  FaPlusCircle,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export default function ExperienceForm() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [periode, setPeriode] = useState<string[]>(["", ""]);
  const [officelocation, setOfficelocation] = useState<string>("");
  const [responsible, setResponsible] = useState<string[]>([]);
  const [achievement, setAchievement] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createExperience({
        name,
        position,
        periode,
        officelocation,
        responsible,
        achievement,
      });
      alert("Experience created successfully!");
      clearForm();
    } catch (error) {
      console.error("Error creating experience:", error);
      alert("Failed to create experience. Please try again later.");
    }
  };

  const clearForm = () => {
    setName("");
    setPosition("");
    setPeriode(["", ""]);
    setOfficelocation("");
    setResponsible([]);
    setAchievement([]);
  };

  const handleAddMore = (type: string) => {
    switch (type) {
      case "responsible":
        setResponsible([...responsible, ""]);
        break;
      case "achievement":
        setAchievement([...achievement, ""]);
        break;
      default:
        break;
    }
  };

  return (
    <main className="flex flex-col w-full h-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <section className="flex flex-col w-full">
          <label className="flex gap-4 p-2 items-center">
            <FaNetworkWired size={20} />
            <input
              type="text"
              placeholder="Organization"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-[20vw]"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaLevelUpAlt size={20} />
            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-[20vw]"
            />
          </label>
        </section>
        <section className="flex flex-col w-full gap-1">
          <label className="flex gap-4 p-2 items-center">
            <FaBuilding size={20} />
            <input
              type="text"
              placeholder="Location"
              value={officelocation}
              onChange={(e) => setOfficelocation(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-[20vw]"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaCalendar size={20} />
            <input
              type="text"
              placeholder="Start Date"
              value={periode[0]}
              onChange={(e) => setPeriode([e.target.value, periode[1]])}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-[20vw]"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaCalendar size={20} />
            <input
              type="text"
              placeholder="End Date"
              value={periode[1]}
              onChange={(e) => setPeriode([periode[0], e.target.value])}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-[20vw]"
            />
          </label>
        </section>
        <section className="flex flex-col w-full">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg font-semibold">Responsibilities</h2>
            <FaPlusCircle
              size={20}
              onClick={() => handleAddMore("responsible")}
              className="cursor-pointer text-[#faad86]"
            />
          </div>
          {responsible.map((res, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Responsibility ${index + 1}`}
              value={res}
              onChange={(e) => {
                const newResponsibles = [...responsible];
                newResponsibles[index] = e.target.value;
                setResponsible(newResponsibles);
              }}
              className="p-2 mt-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-full"
            />
          ))}
        </section>
        <section className="flex flex-col w-full mt-4">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <FaPlusCircle
              size={20}
              onClick={() => handleAddMore("achievement")}
              className="cursor-pointer text-[#faad86]"
            />
          </div>
          {achievement.map((ach, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Achievement ${index + 1}`}
              value={ach}
              onChange={(e) => {
                const newAchievements = [...achievement];
                newAchievements[index] = e.target.value;
                setAchievement(newAchievements);
              }}
              className="p-2 mt-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-full"
            />
          ))}
        </section>
        <div className="flex flex-row items-center gap-2 mt-4 w-full">
          <button
            type="button"
            onClick={clearForm}
            className="p-2 bg-[#faad86]/20 rounded-md text-[#faad86] font-semibold w-1/3 hover:bg-[#faad86]/30 transition duration-200 ease-in-out"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className=" p-2 bg-[#faad86] rounded-md text-[#20202e] font-semibold w-1/3 hover:bg-[#faad86]/80 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
