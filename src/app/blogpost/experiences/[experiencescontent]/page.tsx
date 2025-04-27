'use client'
import React, { useEffect, useState } from "react";
import { getExperienceById } from "@/context/experiences";
import { Experience } from "@/type/exp";

interface ExperiencesContentProps {
  params: { experiencescontent: string };
}

const ExperiencesContent: React.FC<ExperiencesContentProps> = ({ params }) => {
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const fetchExperienceContent = async () => {
      try {
        const data = await getExperienceById(params.experiencescontent);
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience content:", error);
      }
    };

    fetchExperienceContent();
  }, [params.experiencescontent]);

  if (!experience) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl">{experience.name}</h1>
      <p>{experience.position}</p>
      <p>{experience.periode}</p>
      <p>{experience.officelocation}</p>
      <h2 className="font-bold mt-2">Responsibilities</h2>
      <ul className="list-disc w-1/2 p-2">
        {experience.responsible?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperiencesContent;

