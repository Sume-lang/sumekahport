import { Container } from "@/components/reusable/containers";

export default function Dashboards() {
  return (
    <Container className="p-10 flex flex-col h-screen gap-2 overflow-hidden">
      <section className="flex lg:flex-row flex-col items-center justify-center gap-1 w-full h-[30vh] lg:pr-20 lg:pl-20 lg:pt-10">
        <div className="p-5 border-[1px] lg:w-1/3 w-full h-full">Items-1</div>
        <div className="p-5 border-[1px] lg:w-1/3 w-full h-full">Items-2</div>
        <div className="p-5 border-[1px] lg:w-1/3 w-full h-full">Items-3</div>
      </section>
      <section className="p-5 w-full lg:pr-20 lg:pl-20">
        <div className="p-5 border-[1px] w-full h-[50vh]">Items-4</div>
      </section>
      <section className="flex lg:flex-row flex-col items-center justify-center gap-1 w-full h-[50vh] lg:pr-20 lg:pl-20">
        <div className="p-5 border-[1px] lg:w-1/2 w-full h-full">Items-5</div>
        <div className="p-5 border-[1px] lg:w-1/2 w-full h-full">Items-6</div>
      </section>
    </Container>
  );
}

