import Img from "next/image";
import { FaBuilding, FaUserGraduate, FaDev } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { GiOrganigram } from "react-icons/gi";

const dataProfiles = [
  {
    icons: <FaDev size={30} strikethroughThickness={0.5} />,
    title: "Web Development",
    description: "With 2 more years of experinces in Web Development",
  },
  {
    icons: <FaBuilding size={30} strikethroughThickness={0.5} />,
    title: "Experience",
    description: "8 More years of experience in Project Development",
  },
  {
    icons: <FaUserGraduate size={30} strikethroughThickness={0.5} />,
    title: "Education",
    description:
      "20 More non-formal education in online courses and Offline courses has been completed",
  },
  {
    icons: <FaPeopleRoof size={30} strikethroughThickness={0.5} />,
    title: "small projects",
    description:
      "10 More of small projects have been completed and are still running",
  },
  {
    icons: <GiOrganigram size={30} strikethroughThickness={0.5} />,
    title: "Organizational",
    description:
      "Experience in multiple organizations, including as a member of the board of directors and as a project manager",
  },
];
export default function Profiles() {
  return (
    <main className="flex lg:flex-row flex-col w-full h-full gap-1 p-2">
      <section className="p-2 lg:w-1/2 w-full flex items-end justify-end ">
        <Img
          src="/assets/7.png"
          alt="experton"
          width={800}
          height={800}
          className="filter flex items-start lg:pl-[90px] "
        />
      </section>
      <section className="p-2 lg:w-1/3 w-full flex flex-col items-start justify-center gap-2">
        <div>
          <h1 className="text-2xl lg:text-6xl font-bold text-start">
            Commited with <span className="font-extralight text-slate-50">My Profiles</span>
          </h1>
          <p className="w-full text-start text-md font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            sequi iure temporibus quasi quidem, ad illo itaque explicabo
            similique exercitationem officia natus obcaecati fugit dicta quam
            nemo repellat reiciendis? Dolores.
          </p>
        </div>
        <div>
          {dataProfiles.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-center mt-2 bg-[#faad86]/10 rounded-lg shadow-lg w-full h-[10vh] lg:h-[5vh] border-[1px] border-[#faad86]/10"
            >
              <div className="flex flex-row w-full lg:h-[5vh] h-[9vh] items-center gap-5 p-2">
                <h1 className="text-2xl font-bold text-start">{item.icons}</h1>
                <p className="w-full text-start text-md font-extralight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
