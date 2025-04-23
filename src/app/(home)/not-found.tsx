import Img from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col gap-2 mx-auto p-4 w-full items-center justify-center h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86] overflow-hidden">
      <section className="flex flex-col gap-2 items-center justify-center w-full h-full">
        <div>
          <h1 className="text-2xl font-bold">404</h1>
          <h1 className="text-2xl font-bold">Sorry, The Page is Not Exist</h1>
        </div>
        <img src="/assets/notfound.png" alt="" />
      </section>
    </main>
  );
}
