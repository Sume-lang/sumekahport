import React from "react";
// import CreatePackages from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/createComponents/createPackages";
// import Packages from "../../allcomponents/threehighplus/contents/resources/packages";
import CreateIterary from "../../allcomponents/threehighplus/createComponents/createInitarary";
export default function Page() {
  return (
    <main className="w-full">
      <section className="text-slate-200 flex lg:flex-row flex-col p-8 lg:gap-none gap-4 w-full">
        <div className="w-full p-3">
          <CreateIterary />
        </div>
        
      </section>
    </main>
  );
}
