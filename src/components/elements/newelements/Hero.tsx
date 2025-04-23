import Img from "next/image";

export default function Hero() {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <section className="flex lg:flex-row flex-col w-full h-full items-center">
        <div className="flex items-center">
          <Img
            src="/assets/1.png"
            alt="experton"
            width={800}
            height={800}
            className="filter"
          />
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/2 w-full p-4">
          <h1 className="text-2xl lg:text-6xl font-bold text-center">
            Hello, I'm{" "}
            <span className="text-slate-50 font-light">Ahmad Gustiawan</span>{" "}
            Anton Sumekah
            <br />
          </h1>
          <p className="w-full text-center text-md lg:text-2xl font-extralight">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            dolore amet earum quis doloremque enim, qui nisi architecto hic
            deleniti at odit nesciunt consectetur sequi illo tempora! Unde,
            delectus corporis?
          </p>
        </div>
      </section>
    </main>
  );
}
