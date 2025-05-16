"use client";
import React from "react";
import CreateFormEmployee from "../../allcomponents/threehighplus/createComponents/createEmployeement";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="mt-12 lg:-pl-15 lg:-pr-3 min-h-screen w-full">
      <section>
        <CreateFormEmployee />
      </section>
      <section className=" mt-20 mb-20" />
      <motion.section
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-[1px] pb-[1px] pl-[1px] pr-[1px] bg-gradient-to-br from-[#030E36]/120 to-slate-200 w-1/3 rounded-md shadow-md"
      >
        <div className="bg-slate-900 h-full w-full rounded-md">
          <div className="p-20 text-slate-50 h-[250px]"></div>
        </div>{" "}
      </motion.section>{" "}
      *
      {/* <section className="grid grid-cols-6 grid-rows-9 gap-3 w-full h-[92vh]">
        <div className="col-span-2 row-span-3 col-start-1 row-start-1 bg-slate-800 border-[1px] border-slate-50/20 rounded-md p-2 text-slate-50">
          <h1>Date</h1>
        </div>
        <div className="col-span-4 row-span-5 col-start-3 row-start-1 border-[1px] border-slate-50/20 rounded-md p-2 text-slate-50">
          <h1>Task or Active Client</h1>
        </div>
        <div className="col-span-2 row-span-6 col-start-1 row-start-4 bg-slate-800 border-[1px] border-slate-50/20 rounded-md p-2 text-slate-50">
          <h1>Content Management</h1>
        </div>
        <div className="col-span-4 row-span-4 col-start-3 row-start-6 border-[1px] border-slate-50/20 rounded-md p-2 text-slate-50">
          <h1>Chart and Revenues</h1>
        </div>
      </section> */}
    </main>
  );
}
