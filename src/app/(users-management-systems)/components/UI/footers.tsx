import Link from "next/link";
import Img from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const QuickAccess = [
  {
    title: "More About Me",
    link: "#",
  },
  {
    title: "News and Event",
    link: "#",
  },
  {
    title: "Experiences",
    link: "#",
  },
  {
    title: "Project",
    link: "#",
  },
  {
    title: "What People Say",
    link: "#",
  },
  {
    title: "Educations",
    link: "#",
  },
];

const createForm = [
  {
    title: "Create Blog",
    link: "/createpost/blogpost",
  },
  {
    title: "Create Project",
    link: "/createpost/project",
  },
  {
    title: "Create Education",
    link: "/createpost/educations",
  },
  {
    title: "Create Experience",
    link: "/createpost/experiences",
  },
  {
    title: "Create References",
    link: "/createpost/references",
  },
];

export default function Footers() {
  return (
    <main className="flex lg:flex-row flex-col gap-2 w-full lg:pr-24 lg:pl-24 pl-10 pr-10 lg:p-20 border-t-[1px] border-b-[1px] border-[#faad86]/20 bg-[#faad86]/30">
      <section className="p-2 lg:w-1/3 w-full flex lg:flex-row flex-col items-center">
        <div className="w-full flex flex-col items-start justify-start">
          <h1 className="text-2xl font-light">
            My name is Ahmad Gustiawan Anton{" "}
            <span className="text-slate-50 font-bold">Sumekah</span>
          </h1>
          <p className="text-sm font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            officiis ut vitae earum, tenetur rem, ad esse odit quae error
            laboriosam expedita voluptates fugiat enim qui quam quasi amet est.
          </p>
          <div className="flex flex-row gap-2 items-start mt-3">
            <FaInstagram className="w-6 h-6" />
            <FaFacebook className="w-6 h-6" />
            <FaLinkedin className="w-6 h-6" />
            <FaTiktok className="w-6 h-6" />
            <BiLogoGmail className="w-6 h-6" />
          </div>
        </div>
      </section>
      <section className="p-2 lg:w-1/12 w-full flex flex-col items-start justify-start">
        <div>
          <h1 className="font-bold">Quick Links</h1>
        </div>
        <div className="flex flex-col">
          {QuickAccess.map((item) => (
            <div key={item.title} className="flex items-center gap-2">
              <Link href={item.link}>
                <h1 className="text-sm font-extralight hover:text-slate-50 hover:underline">
                  {item.title}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="p-2 lg:w-1/6 w-full flex flex-col items-start justify-start">
        <div>
          <h1 className="font-bold">Quick Create Form</h1>
        </div>
        <div className="flex flex-col">
          {createForm.map((item) => (
            <div key={item.title} className="flex items-center gap-2">
              <Link href={item.link}>
                <h1 className="text-sm font-extralight hover:text-slate-50 hover:underline">
                  {item.title}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
