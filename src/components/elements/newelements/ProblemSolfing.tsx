import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function ProblemSolfing() {
  return (
    <main
      className="flex flex-col h-full w-full items-center justify-center p-2"
    >
      <h1 className={`${dancing.className} text-2xl lg:text-6xl font-bold text-center`}>
        How I Solve the <span className="text-slate-50">Problem</span>
      </h1>
      <p className="text-sm font-extralight text-center lg:w-1/2 w-full mt-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni sapiente
        esse suscipit facilis nostrum officia natus provident repudiandae.
        Exercitationem nemo distinctio incidunt molestias consequatur
        reprehenderit nobis aspernatur soluta. Eligendi, quos.
      </p>
    </main>
  );
}
