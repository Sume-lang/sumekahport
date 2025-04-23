"use client";

import { useState } from "react";
import { createReferences } from "@/context/ref";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function References() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    position: "",
    email: "",
    phone: "",
    related: "",
    desc: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.name ||
      !form.organization ||
      !form.position ||
      !form.email ||
      !form.phone ||
      !form.related ||
      !form.desc
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const refData = await createReferences(form);
      setForm({
        name: "",
        organization: "",
        position: "",
        email: "",
        phone: "",
        related: "",
        desc: "",
      });
    } catch (error) {
      console.error("Error creating references:", error);
      alert("Failed to create references. Please try again later.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-8"
    >
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Add a Reference</h1>
        <p className="text-sm">
          Please fill in the form below to add a reference.
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="organization" className="text-sm">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="Company Name"
                value={form.organization}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="position" className="text-sm">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                placeholder="CEO"
                value={form.position}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                value={form.email}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                value={form.phone}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="related" className="text-sm">
                Related
              </label>
              <input
                type="text"
                id="related"
                name="related"
                placeholder="Friend, Family Member, etc."
                value={form.related}
                onChange={handleChange}
                className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="desc" className="text-sm">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Description of the reference"
              value={form.desc}
              onChange={handleChange}
              className="border-[1px] border-[#faad86]/20 rounded-md p-2 w-full"
              rows={10}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#faad86]/60 text-slate-50 px-4 py-2 rounded-md hover:bg-[#faad86]/20 transition duration-300 ease-in-out w-[200px]"
          >
            <FaPlusCircle className="text-2xl" />
            Add Reference
          </button>
        </form>
      </section>
    </motion.main>
  );
}
