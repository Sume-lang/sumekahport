import React from "react";
import Img from "next/image";
import {
  FaChevronRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";

export default function Hero() {
  return (
    <main className="flex lg:flex-row flex-col lg:h-screen h-auto items-center justify-center mb-5 mt-5 gap-2">
      <section className="lg:w-1/2 w-full flex items-center justify-center">
        <Img src={"/assets/skets.png"} width={1000} height={1000} alt={"hero"} />
      </section>
      <section className="lg:w-1/2 w-full lg:mr-[20%]">
        <h1 className="font-bold lg:text-6xl text-4xl text-center lg:text-start">
          Hay, My Name is Ahmad Gustiawan Anton{" "}
          <span className="font-light text-slate-50">Sumekah</span>
        </h1>
        <p className="w-full font-light text-[15px] text-center lg:text-start">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eum sed
          sit minima porro perspiciatis, tempore saepe quasi ullam quisquam
          repellendus autem fuga expedita aperiam nulla necessitatibus sint
          explicabo in?
        </p>
        <div className="flex flex-row mt-2 border-[1px] border-[#faad86]/20 lg:border-none p-2 rounded-md w-full md:w-full lg:w-1/2 items-center justify-between">
          <div className="flex flex-row gap-2">
            <FaInstagram className="w-6 h-6" />
            <FaFacebook className="w-6 h-6" />
            <FaLinkedin className="w-6 h-6" />
            <FaTelegram className="w-6 h-6" />
          </div>
          <div className="flex flex-row gap-2 items-center text-slate-50 font-light">
            <h1>More About me</h1>
            <FaChevronRight />
          </div>
        </div>
      </section>
    </main>
  );
}
