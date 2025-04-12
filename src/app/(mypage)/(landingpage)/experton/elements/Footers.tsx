export default function Footers() {
  return (
    <main className="h-auto flex flex-col justify-between p-5 w-full">
      <section className="lg:pl-20 lg:pr-20 lg:pt-10 lg:pb-10 h-[30vh]">
        <div className=" border-[#faad86]/20 border-b-[1px] w-full shadow-lg p-2 h-full flex items-start justify-start">
          <div>
            <h1 className="text-2xl underline">Follow Me at</h1>
          </div>
        </div>
      </section>
      <section className="grid lg:grid-cols-3 grid-cols-2 gap-1 w-full h-full">
        <div className="p-4 border w-full">Footer 1</div>
        <div className="p-4 border w-full">Footer 1</div>
        <div className="p-4 border w-full">Footer 1</div>
      </section>
      <section className="h-[10vh] flex items-center justify-center">
        @ Copyright 2025 - Ahmad Gustiawan Anton Sumekah
      </section>
    </main>
  );
}
