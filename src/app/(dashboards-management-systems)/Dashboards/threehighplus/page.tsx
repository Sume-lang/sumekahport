import React from "react";
import CreatePackages from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/createComponents/createPackages";
import Packages from "../../allcomponents/threehighplus/contents/resources/packages";
export default function Page() {
  return (
    <main className="mt-20">
      <section className="text-slate-200 flex lg:flex-row flex-col p-8 lg:gap-none gap-4">
        <div>
          <CreatePackages />
        </div>
        <div className="border lg:w-1/2 w-full p-8">
          <Packages />
        </div>
      </section>
    </main>
  );
}
