"use client";
import { useState, useEffect } from "react";
import {
  getReferencesperson,
  deleteReferences,
  updateReferences,
} from "@/context/ref";
import { Ref } from "@/type/ref";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function GetReferences() {
  const [refs, setRefs] = useState<Ref[]>([]);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Ref>>({});

  useEffect(() => {
    const fetchRefs = async () => {
      try {
        const refs = await getReferencesperson();
        setRefs(refs);
      } catch (error) {
        console.error("Error fetching references:", error);
      }
    };
    fetchRefs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteReferences(id);
      setRefs((prev) => prev.filter((ref) => ref.id !== id));
    } catch (error) {
      console.error("Error deleting reference:", error);
    }
  };

  const handleEdit = (ref: Ref) => {
    setEditingRefId(ref?.id ?? null);
    setFormData({ ...ref });
  };

  const handleUpdate = async () => {
    if (editingRefId) {
      try {
        const updatedRef = await updateReferences(editingRefId, formData);
        setRefs(
          refs.map((ref) =>
            ref.id === editingRefId ? { ...ref, ...updatedRef } : ref
          )
        );
        setEditingRefId(null);
        setFormData({});
      } catch (error) {
        console.error("Error updating reference:", error);
      }
    }
  };

  return (
    <motion.section
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold">References</h1>
      <div className="">
        <table className="w-1/2">
          <thead>
            <tr className="bg-[#faad86]/30">
              <th className="text-start py-1 px-2 border-[#faad86]/10 border-[1px]">
                Name
              </th>
              <th className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                Position
              </th>
              <th className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                Organization
              </th>
              <th className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                Desc
              </th>
              <th className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {refs.map((ref) => (
                <motion.tr
                  key={ref.id}
                  className="hover:bg-[#faad86]/30 transition duration-200 ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                    {editingRefId === ref.id ? (
                      <input
                        type="text"
                        value={formData.name || ref.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Name"
                        className="w-full"
                      />
                    ) : (
                      <span className="truncate max-w-[100px] ">
                        {ref.name}
                      </span>
                    )}
                  </td>
                  <td className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                    {editingRefId === ref.id ? (
                      <input
                        type="text"
                        value={formData.position || ref.position}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            position: e.target.value,
                          })
                        }
                        placeholder="Position"
                        className="w-full"
                      />
                    ) : (
                      <span className="truncate max-w-[100px] ">
                        {ref.position}
                      </span>
                    )}
                  </td>
                  <td className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                    {editingRefId === ref.id ? (
                      <input
                        type="text"
                        value={formData.organization || ref.organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization: e.target.value,
                          })
                        }
                        placeholder="Organization"
                        className="w-full"
                      />
                    ) : (
                      <span className="truncate max-w-[100px] ">
                        {ref.organization}
                      </span>
                    )}
                  </td>
                  <td className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                    {editingRefId === ref.id ? (
                      <input
                        type="text"
                        value={formData.desc || ref.desc}
                        onChange={(e) =>
                          setFormData({ ...formData, desc: e.target.value })
                        }
                        placeholder="Description"
                        className="w-full"
                      />
                    ) : (
                      <span className="truncate max-w-[100px] ">
                        {ref.desc?.substring(0, 100)}
                      </span>
                    )}
                  </td>
                  <td className="py-1 px-2 border-[#faad86]/10 border-[1px]">
                    {editingRefId === ref.id ? (
                      <button onClick={handleUpdate} className="mr-2">
                        Save
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <FaEye className="cursor-pointer" />
                        <FaEdit
                          className="cursor-pointer"
                          onClick={() => handleEdit(ref)}
                        />
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => ref.id && handleDelete(ref.id)}
                        />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
