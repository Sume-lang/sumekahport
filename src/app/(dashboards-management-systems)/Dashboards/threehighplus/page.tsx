import React from "react";
import SliderInOut from "@/components/reusable/sliderinout";
import CreatePackages from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/createComponents/createPackages";
export default function Page() {
  return (
    <SliderInOut>
      <section>
        <CreatePackages />
      </section>
    </SliderInOut>
  );
}
