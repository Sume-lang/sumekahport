import Img from "next/image";
export default function AboutMe() {
  return (
    <main className="flex lg:flex-row flex-col gap-2 p-4 w-full items-center justify-center">
      <section className="lg:w-1/2 w-full">
        <div className="flex flex-col w-full items-start justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Know About <span className="font-light"> Me</span> More
          </h1>
          <p className="w-full text-sm md:text-base lg:text-lg font-light text-start">
            Born in a small town in North Lombok, growing up in various cities,
            and pursuing my education in the bustling city of Malang, Indonesia,
            has given me a broad perspective on how different environments can
            shape my mindset and worldview. I believe in my potential, and I am
            committed to helping each area I live in discover and develop its
            potential in my own way.
          </p>
        </div>
      </section>
      <section className="lg:w-1/2 w-full flex lg:flex-row flex-col gap-2 items-center justify-center">
        <div>
          <Img
            src="/assets/5.png"
            alt="experton"
            width={800}
            height={800}
            className="object-cover rounded-full shadow-lg bg-gradient-to-br hover:from-[#cb8e72] hover:to-transparent hover:shadow-2xl hover:shadow-[#faad86]/10 transition duration-500 ease-in-out"
          />
        </div>
      </section>
    </main>
  );
}
