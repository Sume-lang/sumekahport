"use client";

import { useEffect, useState } from "react";
import { getEducations } from "@/context/educations";
import { Education } from "@/type/edu";

export default function EducationsBlog() {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    (async () => {
      const educationsData = await getEducations();
      setEducations(educationsData ?? []);
    })();
  }, []);

    return (
      <main className=" gap-2 w-full border-[1px] border-[#faad86]/10 rounded-md p-5">
        <div className="grid grid-cols-3 gap-2">
          {educations.map((education) => (
            <div
              key={education.id}
              className="flex flex-col border-[1px] border-[#faad86]/40 rounded-md p-2"
            >
              <h2 className="text-xl font-bold">{education.degree}</h2>
              <p className="">
                {education.fieldOfStudy} at {education.institution}
              </p>
              <p className="">
                {education.startDate} - {education.endDate}
              </p>
            </div>
          ))}
        </div>
      </main>
    );
}
