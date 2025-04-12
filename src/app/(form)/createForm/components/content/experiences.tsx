"use client";
import { useEffect, useState } from "react";
import { getExperience, deleteExperience } from "@/context/experiences";
import { Experience } from "@/type/exp";
import { FaClosedCaptioning, FaEraser, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Experiences() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const data = await getExperience();
        setExperience(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );
    if (confirmDelete) {
      try {
        await deleteExperience(id);
        setExperience((prev) => prev.filter((exp) => exp.id !== id));
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };

  const handleView = (exp: Experience) => {
    setSelectedExperience(exp);
  };

  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains("modal")
    ) {
      setSelectedExperience(null);
    }
  };

  const handleConfirmDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedExperience?.id) {
      handleDelete(selectedExperience.id);
    }
    setSelectedExperience(null);
  };

  return (
    <main className="relative flex flex-row gap-2 mx-auto w-full">
      <section className="flex flex-col w-full">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading experiences: {error.message}</div>
        ) : experience.length === 0 ? (
          <div>No experiences found</div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <table className="w-full">
                <thead className="text-left border-b border-[#faad86]/20 p-2">
                  <tr className="">
                    <th>#</th>
                    <th>Name</th>
                    <th>Periode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experience.map((exp, index) => {
                    if (!exp.periode || exp.periode.length !== 2) {
                      return null;
                    }
                    return (
                      <tr key={exp.id ?? ""}>
                        <td>{`#${index + 1}`}</td>
                        <td>{exp.name}</td>
                        <td>{`${exp.periode[0]} - ${exp.periode[1]}`}</td>
                        <td className="flex gap-2 p-2">
                          <a onClick={() => exp.id && handleDelete(exp.id)}>
                            <FaEraser className="text-sm" size={15} />
                          </a>
                          <a onClick={() => handleView(exp)}>
                            <FaEye className="text-sm" size={15} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backdropFilter: "blur(3px)" }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-black text-[#faad86] flex flex-col gap-4 rounded-lg w-1/2 p-20"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold">{selectedExperience.name}</h2>
              <p>Position: {selectedExperience.position}</p>
              <p>Periode: {selectedExperience.periode?.join(" - ")}</p>
              <p>Office Location: {selectedExperience.officelocation}</p>
              <h3 className="font-bold">Responsibilities</h3>
              <ul className="list-disc pl-5">
                {selectedExperience.responsible?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="font-bold">Achievements</h3>
              <ul className="list-disc pl-5">
                {selectedExperience.achievement?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <form onSubmit={handleConfirmDelete}>
                <motion.button
                  className="mt-4 float-right"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Confirm Delete
                </motion.button>
              </form>
              <motion.button
                className="mt-4 float-right"
                onClick={() => setSelectedExperience(null)}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <FaClosedCaptioning className="text-sm text-white" size={15} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

