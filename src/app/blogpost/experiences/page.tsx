"use client";
import { useEffect, useState } from "react";
import { getExperience } from "@/context/experiences";
import { Experience } from "@/type/exp";
import Link from "next/link";

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperience();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperience();
  }, []);

  const handleView = (exp: Experience) => {
    setSelectedExperience(exp);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Experiences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="p-4 border rounded-md cursor-pointer"
            onClick={() => handleView(exp)}
          >
            <h2 className="font-bold">{exp.name}</h2>
            <p>{exp.position}</p>
            <p>{exp.periode}</p>
          </div>
        ))}
      </div>
      {selectedExperience && (
        <Link
          href={`/blogpost/experiences/${selectedExperience.id}`}
          className="p-4 border rounded-md"
        >
          <h2 className="font-bold">{selectedExperience.name}</h2>
          <p>{selectedExperience.position}</p>
          <p>{selectedExperience.periode}</p>
          <p>{selectedExperience.officelocation}</p>
          <h1 className="font-bold mt-2">Responsibility</h1>
          <ul className="list-disc w-1/2 p-2">
            {selectedExperience.responsible?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h1 className="font-bold mt-2">Achievement</h1>
          <ul className="list-disc w-1/2 p-2">
            {selectedExperience.achievement?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Link>
      )}
    </div>
  );
};

export default ExperiencesPage;
