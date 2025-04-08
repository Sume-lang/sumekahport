import { FaArrowRight } from "react-icons/fa";
export default function Skills() {
  const Codeskills = [
    {
      name: "NextJS",
      icons: "/logopl/nextjs.png",
    },
    {
      name: "TailwindCSS",
      icons: "/logopl/tailwind.png",
    },
    {
      name: "React",
      icons: "/logopl/React.png",
    },
    {
      name: "Typescript",
      icons: "/logopl/typescript.png",
    },
    {
      name: "Javascript",
      icons: "/logopl/javascript.png",
    },
    {
      name: "MySql",
      icons: "/logopl/mysql.png",
    },
    {
      name: "NodeJS",
      icons: "/logopl/nodejs.png",
    },
    {
      name: "Wordpress",
      icons: "/logopl/wordpress.png",
    },
  ];
  const Informations = [
    {
      name: "Microsoft",
    },
    {
      name: "GIS",
    },
    {
      name: "Data Collections",
    },
    {
      name: "Data Analysis",
    },
    {
      name: "Emergency",
    },
    {
      name: "Troubleshooting",
    },
    {
      name: "Administration",
    },
    {
      name: "Design",
    },
  ];
  const Community = [
    {
      name: "Strategic Planning and Coordination",
    },
    {
      name: "Stakeholder Engagement",
    },
    {
      name: "Risk Management",
    },
    {
      name: "Project Management",
    },
  ];
  return (
    <main>
      <section className="flex flex-col h-full w-full">
        <div className="">
          <div className="flex lg:flex-row flex-col lg:gap-2 gap-4 items-start justify-center lg:h-[30vh]">
            <div className="lg:w-1/2 w-full h-full flex flex-col items-start justify-start lg:pl-10 lg:pt-10 p-2 bg-gradient-to-br from-transparent to-slate-600/20 shadow-lg rounded-md border-[1px] border-slate-50/10">
              <div>
                <h1 className="text-xl lg:text-3xl font-extrabold">
                  Web Developments
                </h1>
                <p className="text-sm lg:text-xl font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, hic aut laborum, vitae soluta totam eius
                  exercitationem sequi modi fugiat ad ab quaerat. Reiciendis
                  nobis laborum iure repellendus. Tempore, vel?
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
                {Codeskills.map((item, index) => (
                  <div
                    className="flex items-center justify-start gap-2"
                    key={index}
                  >
                    <span className="text-sm lg:text-[15px] text-start">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-end w-full h-full lg:pt-5 lg:pb-5 lg:pr-5">
                <span className="rounded-full bg-slate-500/20 p-2 border-slate-50/10 border-[1px]  hover:scale-110 transition duration-300 ease-in-out">
                  <FaArrowRight />
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full flex flex-col items-start justify-start lg:pl-10 lg:pt-10 p-2 bg-gradient-to-br from-transparent to-slate-600/20 shadow-lg rounded-md border-[1px] border-slate-50/10">
              <div>
                <h1 className="text-xl lg:text-3xl font-extrabold">
                  Information Managements
                </h1>
                <p className="text-sm lg:text-xl font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, hic aut laborum, vitae soluta totam eius
                  exercitationem sequi modi fugiat ad ab quaerat. Reiciendis
                  nobis laborum iure repellendus. Tempore, vel?
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-4 w-full">
                {Informations.map((item, index) => (
                  <div
                    className="flex items-center justify-start gap-2"
                    key={index}
                  >
                    <span className="text-sm lg:text-[15px] text-start">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-end w-full h-full lg:pt-5 lg:pb-5 lg:pr-5">
                <span className="rounded-full bg-slate-500/20 p-2 border-slate-50/10 border-[1px] hover:scale-110 transition duration-300 ease-in-out">
                  <FaArrowRight />
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full flex flex-col items-start justify-start lg:pl-10 lg:pt-10 p-2 bg-gradient-to-br from-transparent to-slate-600/20 shadow-lg rounded-md border-[1px] border-slate-50/10">
              <div>
                <h1 className="text-xl lg:text-3xl font-extrabold">
                  Community Developments
                </h1>
                <p className="text-sm lg:text-xl font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, hic aut laborum, vitae soluta totam eius
                  exercitationem sequi modi fugiat ad ab quaerat. Reiciendis
                  nobis laborum iure repellendus. Tempore, vel?
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
                {Community.map((item, index) => (
                  <div
                    className="flex items-center justify-start gap-2"
                    key={index}
                  >
                    <span className="text-sm lg:text-[15px] text-start">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-end w-full h-full lg:pt-5 lg:pb-5 lg:pr-5">
                <span className="rounded-full bg-slate-500/20 p-2 border-slate-50/10 border-[1px]  hover:scale-110 transition duration-300 ease-in-out">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
