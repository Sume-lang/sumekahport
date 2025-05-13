import React from "react";

export default function Page() {
  return (
    <main className="mt-12 lg:-pl-15 lg:-pr-3 h-auto w-full">
      <section className="grid grid-cols-6 grid-rows-9 gap-3 w-full h-[92vh]">
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
      </section>
    </main>
  );
}
