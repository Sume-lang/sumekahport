"use client";
import { useState } from "react";
import { createEducation } from "@/context/educations";
import {
  FaBook,
  FaCalendar,
  FaPlusCircle,
  FaBuilding,
  FaLink,
} from "react-icons/fa";

export default function EducationForm() {
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [institution, setInstitution] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link] = useState("");
  const [gpa, setGpa] = useState("");
  const [achievements, setAchievements] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createEducation({
        degree,
        fieldOfStudy,
        institution,
        startDate,
        endDate,
        link,
        gpa,
        achievements,
      });
      alert("Education created successfully!");
      clearForm();
    } catch (error) {
      console.error("Error creating education:", error);
      alert("Failed to create education. Please try again later.");
    }
  };

  const clearForm = () => {
    setDegree("");
    setFieldOfStudy("");
    setInstitution("");
    setStartDate("");
    setEndDate("");
    setGpa("");
    setAchievements([]);
  };

  const handleAddMore = (type: string) => {
    switch (type) {
      case "achievements":
        setAchievements([...achievements, ""]);
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
            <FaBook size={20} />
            <input
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaBook size={20} />
            <input
              type="text"
              placeholder="Field of Study"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaBuilding size={20} />
            <input
              type="text"
              placeholder="Institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
        </section>
        <section className="flex flex-col w-full gap-1">
          <label className="flex gap-4 p-2 items-center">
            <FaCalendar size={20} />
            <input
              type="text"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaCalendar size={20} />
            <input
              type="text"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
          <label className="flex gap-4 p-2 items-center">
            <FaLink size={20} />
            <input
              type="text"
              placeholder="related link"
              value={link}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>

          <label className="flex gap-4 p-2 items-center">
            <FaBook size={20} />
            <input
              type="text"
              placeholder="GPA"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              className="p-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light lg:w-[20vw] w-full"
            />
          </label>
        </section>
        <section className="flex flex-col w-full">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <FaPlusCircle
              size={20}
              onClick={() => handleAddMore("achievements")}
              className="cursor-pointer text-[#faad86]"
            />
          </div>
          {achievements.map((ach, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Achievement ${index + 1}`}
              value={ach}
              onChange={(e) => {
                const newAchievements = [...achievements];
                newAchievements[index] = e.target.value;
                setAchievements(newAchievements);
              }}
              className="p-2 mt-2 border-[1px] border-[#faad86]/15 bg-[#20202e] rounded-md text-slate-50/60 font-light w-full"
            />
          ))}
        </section>
        <div className="flex flex-row items-center gap-2 mt-4 w-full">
          <button
            type="button"
            onClick={clearForm}
            className="p-2 bg-[#faad86]/20 rounded-md text-[#faad86] font-semibold w-[200px] hover:bg-[#faad86]/30 transition duration-200 ease-in-out"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className=" p-2 bg-[#faad86] rounded-md text-[#20202e] font-semibold w-[200px] hover:bg-[#faad86]/80 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
