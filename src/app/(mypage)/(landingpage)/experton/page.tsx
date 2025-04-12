import { Container } from "@/component/containers";
import Hero from "./elements/hero";
import Dev from "./elements/developotment";
import AboutMe from "./elements/aboutme";
import Experiences from "./elements/experiences";
import { Blog } from "./elements/blogpost";
import References from "./elements/references";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Experton() {
  return (
    <Container>
      <section className="lg:pr-24 lg:pl-24 p-4 flex lg:flex-row flex-col gap-2">
        <Hero />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-48 p-4 flex flex-col lg:flex-row h-[50vh] w-full relative">
        <div className="lg:w-1/2 w-full h-full flex items-center justify-center">
          <div className=" p-4 w-full h-full flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              As a Information Management, I create the task More{" "}
              <span className="font-light">Efficiently</span>
            </h1>
            <p className="w-full text-sm md:text-base lg:text-lg font-light">
              I've got used to working with some approaches, to build the
              organization I manage, I use Agile approach, which allows me to be
              more flexible in managing teams and projects. I also have
              experience in using Waterfall approach, which is more structured
              and planned. With this experience, I can pick the approach that
              best fits each project I work on.
            </p>
          </div>
        </div>
        <div className="w-full h-full lg:pr-20 lg:pl-20">
          <Dev />
        </div>
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[60vh] w-full relative">
        <div className="flex flex-col w-full items-end justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            For Over <span className="font-light">8 Years</span> of Experiences
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-end">
            With loads of experience in several organizations, I've honed my
            skills to maximize my achievements and make a real impact on my
            organization's productivity and team performance. Over the past 8
            years, I've learned a thing or two about how to manage teams and
            projects effectively, as well as how to communicate with all
            stakeholders in a project.
          </p>
        </div>
        <div className="w-full flex">
          <Experiences />
        </div>
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-auto w-full relative items-start justify-startxj">
        <AboutMe />
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[70vh] w-full relative">
        <div className="flex flex-col w-full items-center justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Fluent in <span className="font-light">Many</span> of Digital
            Platforms <br />
            and <span className="font-light">Tools</span>
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-center">
            To achieve my goals, I use various digital platforms and tools that
            help me reach my objectives. I work hard to master these tools, so I
            can maximize my potential and deliver the best results for my
            organization.
          </p>
        </div>
        <div className="h-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 flex flex-col items-center justify-center gap-2 h-[20vh] w-full relative bg-[#faad86]/20 border-[#faad86]/10 border-[1px]">
        <div className="h-full text-center flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            How I Solve the <span className="font-light">Problems</span> ?
          </h1>
          <h2 className={`${dancing.className} text-2xl lg:w-1/2 w-full`}>
            On a daily basis, when tackling problems, I'm used to taking a step
            back, reading up, searching for solutions, and then nailing them
            down with precision results.
          </h2>
        </div>
      </section>
      <section className="h-[10vh]" />
      <section className="lg:pr-24 lg:pl-24 flex flex-col gap-2 h-[50vh] w-full relative">
        <div className="flex flex-col w-full items-start justify-start">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Breakdown My <span className="font-light">Project</span> of
            Proffesional Works <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full flex items-start justify-start">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      <section className="h-[10vh]" />
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[50vh] w-full relative">
        <div className="flex flex-col w-full items-center justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            I Get <span className="font-light">Knowledge</span> From Many
            Sources <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full flex items-start justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      <section className="h-[10vh]" />
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pb-24 lg:pt-10 flex flex-col gap-2 h-auto w-full relative">
        <div className="flex flex-col w-full items-end justify-end lg:mb-5">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Latest <span className="font-light">Blog</span> And Events Envolved{" "}
            <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-end">
            This is an article fetched from a free API service that manages
            several blogs, and I'm using it as an example of what I can achieve
            with API integration in for this portfolio.
          </p>
        </div>
        <div className="h-full flex items-start justify-end p-2">
          <Blog />
        </div>
      </section>
      <section className="h-[10vh]" />
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pb-24 lg:pt-10 flex flex-col gap-2 h-auto w-full relative">
        <div className="flex flex-col w-full items-end justify-end lg:mb-5">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            What <span className="font-light">They Say</span> About Me <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-end">
            This is an article fetched from a free API service that manages
            several blogs, and I'm using it as an example of what I can achieve
            with API integration in for this portfolio.
          </p>
        </div>
        <div className="h-full flex items-start justify-end p-2">
          <References />
        </div>
      </section>
    </Container>
  );
}
