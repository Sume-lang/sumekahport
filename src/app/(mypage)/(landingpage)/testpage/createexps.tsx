"use client";
import { useState } from "react";
import { createExperience } from "@/context/experiences";
import { FaEraser, FaPlusCircle } from "react-icons/fa";

export default function ExperienceForm() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [periode, setPeriode] = useState<string[]>([]);
  const [officelocation, setOfficelocation] = useState<string[]>([]);
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
    } catch (error) {
      console.error("Error creating experience:", error);
      alert("Failed to create experience. Please try again later.");
    }
  };

  const handleAddMore = (type: string) => {
    switch (type) {
      case "periode":
        setPeriode([...periode, ""]);
        break;
      case "officelocation":
        setOfficelocation([...officelocation, ""]);
        break;
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
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-2">
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Title:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2"
        />
      </label>
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Position:
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="p-2"
        />
      </label>
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Periode:
        {periode.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) =>
                setPeriode(
                  periode.map((p, j) => (j === i ? e.target.value : p))
                )
              }
              className="p-2"
            />
            {periode.length > 1 && (
              <a
                className="flex items-center"
                type="button"
                onClick={() => setPeriode(periode.filter((p, j) => i !== j))}
              >
                <FaEraser size={15} />
              </a>
            )}
          </div>
        ))}
        <a
          type="button"
          onClick={() => handleAddMore("periode")}
          className="flex items-center"
        >
          <FaPlusCircle size={15} />
        </a>
      </label>
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Officelocation:
        {officelocation.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) =>
                setOfficelocation(
                  officelocation.map((p, j) => (j === i ? e.target.value : p))
                )
              }
              className="p-2"
            />
            {officelocation.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setOfficelocation(officelocation.filter((p, j) => i !== j))
                }
              >
                x
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddMore("officelocation")}>
          Add more
        </button>
      </label>
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Responsible:
        {responsible.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) =>
                setResponsible(
                  responsible.map((p, j) => (j === i ? e.target.value : p))
                )
              }
              className="p-2"
            />
            {responsible.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setResponsible(responsible.filter((p, j) => i !== j))
                }
              >
                x
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddMore("responsible")}>
          Add more
        </button>
      </label>
      <label className="flex w-1/2 gap-4 p-2 items-center">
        Achievement:
        {achievement.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) =>
                setAchievement(
                  achievement.map((p, j) => (j === i ? e.target.value : p))
                )
              }
              className="p-2"
            />
            {achievement.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setAchievement(achievement.filter((p, j) => i !== j))
                }
              >
                x
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddMore("achievement")}>
          Add more
        </button>
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
