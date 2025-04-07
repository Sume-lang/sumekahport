import { Lato, Dancing_Script } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import Img from "next/image";

export default function MyPage() {
  return (
    <main className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-950 text-white">
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-500 to-slate-900 text-center lg:p-0 p-12">
        <div className="max-w-2xl p-8 bg-slate-950 bg-opacity-10 backdrop-blur rounded-lg shadow-lg">
          <Img
            src="/assets/myprofiles.png"
            alt="Profile Image"
            width={150}
            height={150}
            className="mx-auto rounded-full mb-4"
          />
          <h1
            className={`${dancing.className} text-4xl md:text-5xl font-extrabold mb-4 text-slate-50`}
          >
            Hello, Welcome
          </h1>
          <p className="text-lg md:text-xl mb-6 text-slate-50">
            I am a passionate developer specializing in creating exceptional
            digital experiences. Explore my work and let’s create something
            amazing together!
          </p>
          <a
            href="/experton"
            className="inline-block px-8 py-3 bg-slate-600 text-white font-semibold rounded hover:bg-slate-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
