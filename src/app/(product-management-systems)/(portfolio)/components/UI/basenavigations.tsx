import Link from "next/link";
import Img from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const QuickAccess = [
  {
    title: "Home",
    link: "/",
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

const ProductBussiness = [
  {
    title: "Portfolio",
    link: "/myportfolio",
  },
  {
    title: "Threehightplus",
    link: "/threehighplus",
  },
  {
    title: "Pasir Putih Foundations",
    link: "/pasir-putih-foundations",
  },
  {
    title: "Ylkmp",
    link: "/ylkmp",
  },
  {
    title: "Kampung Adat Karang Bajo",
    link: "/karangbajo",
  },
];

export default function BaseFooters() {
  return (
    <main className="flex lg:flex-row flex-col gap-2 w-full lg:pr-24 lg:pl-24 pl-2 pr-2 lg:p-20 border-t-[1px] border-b-[1px] border-[#faad86]/10 bg-[#faad86]/30">
      <section className="p-2 w-full flex lg:flex-row flex-col items-center">
        <div className="w-full flex flex-col items-start justify-start">
          <h1 className="text-2xl font-light">
            My name is Ahmad Gustiawan Anton{" "}
            <span className="text-slate-50 font-bold">Sumekah</span>
          </h1>
          <p className="text-sm font-extralight lg:w-1/2">
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
      <section className="p-2 lg:w-1/2 lg:flex flex-row items-end justify-end grid grid-cols-3 gap-2">
        <div className="lg:w-1/4 md:w-full h-full flex flex-col">
          <div>
            <h1 className="font-bold">Quick Links</h1>
          </div>
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
        <div className="lg:w-1/4 md:full h-full flex flex-col">
          <div>
            <h1 className="font-bold">Create Form</h1>
          </div>
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
        <div className="lg:w-1/4 md:full h-full flex flex-col">
          <div>
            <h1 className="font-bold">Web Project</h1>
          </div>
          {ProductBussiness.map((item) => (
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
